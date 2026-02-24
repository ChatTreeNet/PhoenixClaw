#!/usr/bin/env node
/**
 * PhoenixClaw Rolling Journal - 滚动日记生成器
 * 
 * 改进版日记生成逻辑：
 * 1. 允许用户配置生成时间（默认 22:00）
 * 2. 扫描范围：上次日记时间 → 现在（滚动窗口）
 * 3. 解决 22:00-24:00 内容遗漏问题
 * 
 * Usage: node rolling-journal.js [YYYY-MM-DD]
 */

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  journalPath: process.env.PHOENIXCLAW_JOURNAL_PATH || '/mnt/synology/zpro/notes/日记',
  sessionRoots: (process.env.OPENCLAW_SESSIONS_PATH || '').split(path.delimiter).filter(Boolean),
  configPath: path.join(require('os').homedir(), '.phoenixclaw/config.yaml'),
  timezone: 'Asia/Shanghai',
  defaultHour: 22  // 默认生成时间
};

/**
 * 默认 session 搜索路径列表（覆盖所有已知位置）
 */
function getDefaultSessionRoots() {
  const home = require('os').homedir();
  return [
    path.join(home, '.openclaw', 'sessions'),
    path.join(home, '.openclaw', 'agents'),
    path.join(home, '.openclaw', 'cron', 'runs'),
    path.join(home, '.agent', 'sessions'),
  ];
}

/**
 * 读取用户配置
 */
function loadConfig() {
  const config = {
    scheduleHour: CONFIG.defaultHour,
    scheduleMinute: 0,
    rollingWindow: true  // 是否启用滚动窗口
  };

  if (fs.existsSync(CONFIG.configPath)) {
    try {
      const content = fs.readFileSync(CONFIG.configPath, 'utf-8');
      // 简单 YAML 解析
      const hourMatch = content.match(/schedule_hour:\s*(\d+)/);
      const minuteMatch = content.match(/schedule_minute:\s*(\d+)/);
      const rollingMatch = content.match(/rolling_window:\s*(true|false)/);
      
      if (hourMatch) config.scheduleHour = parseInt(hourMatch[1]);
      if (minuteMatch) config.scheduleMinute = parseInt(minuteMatch[1]);
      if (rollingMatch) config.rollingWindow = rollingMatch[1] === 'true';
    } catch (e) {
      console.error('Error reading config:', e.message);
    }
  }

  return config;
}

/**
 * 找到最后一次日记的时间
 */
function getLastJournalTime() {
  const dailyDir = path.join(CONFIG.journalPath, 'daily');
  if (!fs.existsSync(dailyDir)) return null;

  const files = fs.readdirSync(dailyDir)
    .filter(f => f.endsWith('.md'))
    .map(f => ({
      file: f,
      date: f.replace('.md', ''),
      mtime: fs.statSync(path.join(dailyDir, f)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime);

  if (files.length === 0) return null;

  // 返回最新日记的修改时间
  return files[0].mtime;
}

/**
 * 递归查找目录下所有 .jsonl 文件
 */
function findJsonlFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return results;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findJsonlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.jsonl')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * 读取所有 session 日志文件（扫描多个目录 + 递归）
 */
function readSessionLogs() {
  const roots = CONFIG.sessionRoots.length > 0
    ? CONFIG.sessionRoots
    : getDefaultSessionRoots();

  const allFiles = [];
  for (const root of roots) {
    const files = findJsonlFiles(root);
    allFiles.push(...files);
    if (files.length > 0) {
      console.log(`  [scan] ${root} → ${files.length} file(s)`);
    }
  }

  if (allFiles.length === 0) {
    console.error('No session log files found in any directory');
    return [];
  }

  console.log(`  [scan] Total session files: ${allFiles.length}`);

  const logs = [];
  let parseErrors = 0;

  for (const file of allFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      for (const line of lines) {
        try {
          const entry = JSON.parse(line);
          logs.push(entry);
        } catch (e) {
          parseErrors++;
        }
      }
    } catch (e) {
      console.error(`Error reading ${file}:`, e.message);
    }
  }

  if (parseErrors > 0) {
    console.log(`  [scan] Skipped ${parseErrors} malformed line(s)`);
  }

  logs.sort((a, b) => {
    const ta = new Date(a.timestamp || a.created_at || 0).getTime();
    const tb = new Date(b.timestamp || b.created_at || 0).getTime();
    return ta - tb;
  });

  return logs;
}

/**
 * 过滤从上次日记到现在的消息
 */
function filterRollingWindowMessages(logs, lastJournalTime) {
  const startTime = lastJournalTime || new Date(Date.now() - 24 * 60 * 60 * 1000); // 默认24小时前
  const endTime = new Date();

  return logs.filter(entry => {
    const timestamp = entry.timestamp || entry.created_at;
    if (!timestamp) return false;

    const entryTime = new Date(timestamp);
    return entryTime >= startTime && entryTime <= endTime;
  });
}

/**
 * 从嵌套 message 结构中提取完整文本
 */
function extractText(entry) {
  if (typeof entry.content === 'string') return entry.content;
  if (entry.message && Array.isArray(entry.message.content)) {
    return entry.message.content.map(c => c.text || '').join(' ');
  }
  if (Array.isArray(entry.content)) {
    return entry.content.map(c => (typeof c === 'string' ? c : c.text || '')).join(' ');
  }
  return '';
}

/**
 * 判断消息是否是"有意义的"
 */
function isMeaningfulMessage(entry) {
  const text = extractText(entry);

  // 排除心跳检测 — 用户端：包含 "Read HEARTBEAT.md" 且包含 "reply HEARTBEAT_OK"
  if (/Read HEARTBEAT\.md/i.test(text) && /reply HEARTBEAT_OK/i.test(text)) return false;

  // 排除心跳检测 — 助手端：仅包含 "HEARTBEAT_OK"
  if (/^\s*HEARTBEAT_OK\s*$/i.test(text)) return false;

  // 排除 cron 系统消息
  if ((entry.role === 'system' || entry.role === 'cron') &&
      /cron job|nightly reflection|scheduler/i.test(text)) return false;

  // 排除纯系统消息（保留带附件的系统消息）
  if (entry.role === 'system' && !text.includes('attached')) return false;

  // 保留用户消息和助手回复
  if (entry.role === 'user' || entry.role === 'assistant') return true;

  // 保留图片等媒体
  if (entry.type === 'image') return true;

  return false;
}

/**
 * 提取时刻信息
 */
function extractMoments(messages) {
  const moments = [];
  let currentDate = null;
  
  for (const msg of messages) {
    const time = new Date(msg.timestamp || msg.created_at);
    const dateStr = time.toISOString().split('T')[0];
    const timeStr = time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    
    // 检测日期变化
    if (currentDate !== dateStr) {
      currentDate = dateStr;
      moments.push({
        type: 'date-marker',
        date: dateStr
      });
    }
    
    if (msg.type === 'image') {
      moments.push({
        time: timeStr,
        type: 'image',
        description: '分享图片'
      });
    } else if (msg.content) {
      // 简化内容（只取前50字）
      const preview = msg.content.substring(0, 50).replace(/\n/g, ' ');
      const suffix = msg.content.length > 50 ? '...' : '';
      moments.push({
        time: timeStr,
        type: 'text',
        role: msg.role === 'user' ? '你' : 'Claw',
        preview: preview + suffix
      });
    }
  }
  
  return moments;
}

/**
 * 生成日记内容
 */
function generateJournal(moments, startTime, endTime) {
  if (moments.length === 0) return null;

  const startDate = startTime.toISOString().split('T')[0];
  const endDate = endTime.toISOString().split('T')[0];
  const dateRange = startDate === endDate ? startDate : `${startDate} ~ ${endDate}`;
  
  let content = `---\n`;
  content += `date: ${endDate}\n`;
  content += `type: daily\n`;
  content += `time_range: ${startTime.toLocaleString('zh-CN')} ~ ${endTime.toLocaleString('zh-CN')}\n`;
  content += `---\n\n`;
  content += `# 日记 ${dateRange}\n\n`;
  
  let currentDate = null;
  for (const moment of moments) {
    if (moment.type === 'date-marker') {
      if (currentDate !== null) content += '\n';
      currentDate = moment.date;
      content += `## ${moment.date}\n\n`;
    } else if (moment.type === 'image') {
      content += `- **${moment.time}** 📸 ${moment.description}\n`;
    } else {
      content += `- **${moment.time}** ${moment.role}: ${moment.preview}\n`;
    }
  }
  
  content += `\n---\n`;
  content += `*Generated by PhoenixClaw Rolling Journal at ${new Date().toLocaleString('zh-CN')}*\n`;
  
  return content;
}

/**
 * 保存日记
 */
function saveJournal(content, date) {
  const dailyDir = path.join(CONFIG.journalPath, 'daily');
  if (!fs.existsSync(dailyDir)) {
    fs.mkdirSync(dailyDir, { recursive: true });
  }
  
  const filename = path.join(dailyDir, `${date}.md`);
  fs.writeFileSync(filename, content);
  return filename;
}

/**
 * 主函数
 */
async function main() {
  console.log('[PhoenixClaw Rolling Journal] Starting...');
  
  // 1. 加载配置
  const userConfig = loadConfig();
  console.log(`Schedule: ${userConfig.scheduleHour}:${String(userConfig.scheduleMinute).padStart(2, '0')}`);
  console.log(`Rolling window: ${userConfig.rollingWindow ? 'enabled' : 'disabled'}`);

  // 2. 找到上次日记时间
  const lastJournalTime = getLastJournalTime();
  if (lastJournalTime) {
    console.log(`Last journal: ${lastJournalTime.toLocaleString('zh-CN')}`);
  } else {
    console.log('No previous journal found, using default 24h window');
  }

  // 3. 读取会话日志
  console.log('Scanning session directories...');
  const logs = readSessionLogs();
  console.log(`Read ${logs.length} total log entries`);

  // 4. 过滤滚动窗口消息
  const windowStart = userConfig.rollingWindow ? lastJournalTime : new Date(Date.now() - 24 * 60 * 60 * 1000);
  const windowMessages = filterRollingWindowMessages(logs, windowStart);
  console.log(`Messages in window: ${windowMessages.length}`);

  // 5. 过滤有意义的消息
  const meaningfulMessages = windowMessages.filter(isMeaningfulMessage);
  const imageCount = meaningfulMessages.filter(m => m.type === 'image').length;
  const textCount = meaningfulMessages.filter(m => m.type !== 'image').length;
  console.log(`Meaningful messages: ${meaningfulMessages.length} (text: ${textCount}, images: ${imageCount})`);
  const userCount = meaningfulMessages.filter(m => m.role === 'user').length;
  const assistantCount = meaningfulMessages.filter(m => m.role === 'assistant').length;
  console.log(`  user: ${userCount}, assistant: ${assistantCount}`);

  if (meaningfulMessages.length === 0) {
    console.log('No content to journal, skipping');
    process.exit(0);
  }

  // 6. 提取时刻并生成日记
  const moments = extractMoments(meaningfulMessages);
  const journalContent = generateJournal(moments, windowStart || new Date(Date.now() - 24 * 60 * 60 * 1000), new Date());
  
  if (journalContent) {
    const today = new Date().toISOString().split('T')[0];
    const filename = saveJournal(journalContent, today);
    console.log(`✅ Journal saved: ${filename}`);
    console.log(`   Contains ${moments.filter(m => m.type !== 'date-marker').length} moments`);
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
}

module.exports = {
  findJsonlFiles,
  readSessionLogs,
  filterRollingWindowMessages,
  isMeaningfulMessage,
  extractMoments,
  extractText,
  getDefaultSessionRoots,
};
