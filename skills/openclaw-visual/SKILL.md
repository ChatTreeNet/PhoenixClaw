---
name: openclaw-visual
description: |
  [EN] Transform OpenClaw information (PhoenixClaw logs, chat records, messages) into beautifully designed images for sharing in Telegram/Slack/Discord.
  
  [ZH] 将 OpenClaw 中的信息（PhoenixClaw 日志、聊天记录、单条消息等）转换为精美排版的图片，便于在聊天窗口（Telegram/Slack/Discord 等）中直接展示和分享。

  Use when / 使用场景:
  - [EN] User asks to convert content to image ("make this into a picture")
  - [ZH] 用户要求将内容做成图片 ("帮我把这段话做成图片")
  - [EN] User requests log visualization ("generate today's journal image")
  - [ZH] 用户要求生成日志可视化 ("生成今日日志分享图")
  - [EN] User requests chat summary visualization ("make a summary image of today's conversation")
  - [ZH] 用户要求聊天记录可视化 ("把今天的对话做成总结图")
depends:
  - node-html-to-image
metadata:
  version: 0.0.2
  i18n:
    supported_locales: [en, zh]
    default_locale: zh
---

# OpenClaw Visual / 精美图文生成器

[EN] Convert any OpenClaw information into beautifully designed images for direct sharing in chat windows.

[ZH] 将 OpenClaw 中的任何信息转换为精美排版的图片，直接在聊天窗口中展示。

**Design Style / 设计风格**: Modern Minimal / Swiss Style / Editorial / 现代极简 / 瑞士风格 / 编辑排版

**Core Flow / 核心流程**: Content → HTML Template → Local Image Generation → Send to User

**Image Generation / 图片生成**: Local rendering, no external API
- **Default / 默认**: `node-html-to-image` (lightweight & fast / 轻量快速)
- **Advanced / 高级**: `playwright` (when user requests beautiful/complex effects / 用户要求精美/复杂效果时)

## 🎯 Use Cases / 使用场景

### 1. Single Message to Image / 单条消息转图片

[EN] User says: "Make this into a nice shareable image"

[ZH] 用户说: "帮我把这段话做成好看的分享图"

AI will / AI 将：
1. Analyze content type (quote/idea/philosophy) / 分析内容类型（金句/引用/想法）
2. Select template (quote card) / 选择合适模板（引用卡片/金句卡片）
3. Generate image / 生成精美图片
4. Send in chat / 在聊天窗口发送图片

### 2. PhoenixClaw Journal Visualization / PhoenixClaw 日志可视化

[EN] User says: "Generate today's journal image"

[ZH] 用户说: "生成今天的日志分享图"

AI will / AI 将：
1. Read `~/PhoenixClaw/Journal/daily/YYYY-MM-DD.md` / 读取日志文件
2. Parse frontmatter and sections / 解析 frontmatter 和 sections
3. Select template (social/card/scrapbook style) / 选择模板（社交卡片/手账风格）
4. Generate image / 生成精美图片
5. Send in chat / 在聊天窗口发送图片

### 3. Chat Summary / 聊天记录摘要

[EN] User says: "Make a summary image of today's conversation"

[ZH] 用户说: "把今天的对话做成总结图"

AI will / AI 将：
1. Scan today's session logs / 扫描今日会话记录
2. Extract key information / 提取关键信息
3. Generate timeline/dashboard style image / 生成时间线/仪表盘风格图片
4. Send in chat / 在聊天窗口发送图片

## 🛠️ Core Workflow / 核心工作流

### Step 1: Content Recognition / 步骤 1: 内容识别

Analyze user request, identify content type / 分析用户请求，识别内容类型：

| Content Type<br>内容类型 | Recognition<br>识别方式 | Example<br>示例 |
|-------------------------|------------------------|----------------|
| Single Message<br>单条消息 | User provides text directly<br>用户直接提供文本 | "Make this into an image"<br>"帮我把这段话做成图片" |
| PhoenixClaw Journal<br>PhoenixClaw 日志 | User mentions journal/diary<br>用户提及日志/日记 | "Generate today's journal image"<br>"生成今日日志图" |
| Chat Records<br>聊天记录 | User mentions conversation<br>用户提及对话/聊天 | "Summary of today's chat"<br>"把今天的对话做成图" |
| Quote/Insight<br>引用/金句 | Text contains quotes/philosophy<br>文本包含引号或哲理内容 | Famous quotes<br>名言警句 |

### Step 2: Template Selection / 步骤 2: 模板选择

Auto-select best template based on content type / 根据内容类型自动选择最佳模板：

**quote-card** - Quote Card / 金句/引用卡片
- [EN] For: quotes, philosophy, short insights
- [ZH] 适用: 名言、哲理、简短感悟
- Size / 尺寸: 800x800 (square, Instagram-friendly / 方形，适合 Instagram)
- Features / 特点: Large typography, solid background, SVG icons / 大字体编辑排版、纯色背景、SVG 图标
- Themes / 主题: light / dark / accent / blue

**moment-card** - Moment Card / 瞬间/时刻卡片
- [EN] For: single photo + description
- [ZH] 适用: 单张照片 + 描述
- Size / 尺寸: 800x1000 (portrait / 竖版)
- Features / 特点: Magazine style, large image, time/location icons / 杂志风格、大图留白、时间/位置 SVG 图标

**daily-journal** - Journal Style / 日记编辑风格
- [EN] For: PhoenixClaw complete journal
- [ZH] 适用: PhoenixClaw 完整日志
- Size / 尺寸: 800x1200 (portrait / 竖版)
- Features / 特点: Swiss grid, clear hierarchy, large date / 瑞士网格系统、清晰层级、SVG 图标、大日期数字

**social-share** - Social Card / 社交媒体卡片
- [EN] For: sharing highlights/achievements
- [ZH] 适用: 分享亮点/成就
- Size / 尺寸: 1200x630 (OG Image)
- Features / 特点: Two-column layout, statistics display / 双栏布局、纯色/深色主题、统计数据展示

**dashboard** - Data Dashboard / 数据仪表盘
- [EN] For: weekly/monthly summaries, statistics
- [ZH] 适用: 周/月度汇总、统计数据
- Size / 尺寸: 1200x800 (landscape / 横版)
- Features / 特点: Data visualization, monochrome charts, grid layout / 数据可视化、单色图表、网格布局

### Step 3: HTML/CSS Generation / 步骤 3: HTML/CSS 生成

Generate HTML based on selected template / 根据选定模板，填充内容生成 HTML：

1. Read template file `assets/templates/{template-name}.html`
2. Replace placeholder variables / 替换占位符变量:
   - `{{TITLE}}` / `{{标题}}` - Title / 标题
   - `{{CONTENT}}` / `{{内容}}` - Main content / 主要内容
   - `{{DATE}}` / `{{日期}}` - Date / 日期
   - `{{MOOD}}` / `{{心情}}` - Mood text / 心情文字
   - `{{ENERGY}}` / `{{能量}}` - Energy level / 能量值
   - `{{IMAGE_URL}}` / `{{图片链接}}` - Image URL / 图片 URL
3. Apply base styles `assets/css/base-styles.css`
4. Use system font stack (no external fonts) / 使用系统字体栈 (无需外部字体):
   - Chinese / 中文: system-ui, PingFang SC, Microsoft YaHei
   - English / 英文: system-ui, Segoe UI, Roboto

### Step 4: Image Generation / 步骤 4: 图片生成

Generate image using local script / 使用本地脚本生成图片：

```bash
# Call local generation script / 调用本地生成脚本
node scripts/generate-image.js \
  --template quote-card \
  --content '{"QUOTE":"Action cures fear","AUTHOR":"William James"}' \
  --output ~/OpenClaw/Visuals/output.png
```

**Renderer Selection / 渲染引擎选择**:
- **Default / 默认** (`node-html-to-image`): Lightweight, fast / 轻量快速，适合大多数场景
- **Advanced / 高级** (`playwright`): When user requests "beautiful/complex/advanced" effects / 当用户要求"精美/复杂/高级"效果时自动切换

### Step 5: Return Result / 步骤 5: 返回结果

Script returns JSON result / 脚本返回 JSON 结果：

```json
{
  "success": true,
  "outputPath": "/Users/xxx/OpenClaw/Visuals/output.png",
  "renderer": "nodejs",
  "template": "quote-card",
  "dimensions": { "width": 800, "height": 800 }
}
```

OpenClaw reads the generated image file and sends to user / OpenClaw 读取生成的图片文件并发送给用户。

## 📋 Template Details / 模板详情

### quote-card (Quote Card / 金句卡片)

**Use Case / 适用场景**: Quotes, philosophy, short insights / 名言、哲理、简短感悟

**Layout / 布局**:
```
┌─────────────────────┐
│                     │
│      "Quote"        │
│                     │
│    —— Author        │
│                     │
│  [Decor]  [Date]    │
└─────────────────────┘
```

**Style Features / 样式特点**:
- Gradient background (purple→pink / blue→cyan / orange→red) / 渐变背景 (紫→粉 / 蓝→青 / 橙→红)
- Large serif fonts / 大号衬线字体
- Decorative quotes / 装饰性引号
- Bottom decoration line and date / 底部装饰线和日期

**Variables / 变量**:
- `{{QUOTE}}` / `{{引用}}` - Quote content / 引用内容
- `{{AUTHOR}}` / `{{作者}}` - Author/Source / 作者/来源
- `{{DATE}}` / `{{日期}}` - Date (optional) / 日期 (可选)
- `{{THEME}}` - Theme (purple/blue/orange) / 配色主题

---

### moment-card (Moment Card / 瞬间卡片)

**Use Case / 适用场景**: Single photo + description / 单张照片 + 描述

**Layout / 布局**:
```
┌─────────────────────┐
│  [Photo]            │
│                     │
│  🕐 Time            │
│                     │
│  Description...     │
│                     │
│  [Mood emoji]       │
└─────────────────────┘
```

**Style Features / 样式特点**:
- Photo takes 60% height / 照片占 60% 高度
- Rounded corners / 圆角设计
- Timestamp with icon / 时间戳带图标
- Mood emoji decoration / 心情 emoji 装饰

**Variables / 变量**:
- `{{IMAGE_URL}}` / `{{图片链接}}` - Photo URL (public) / 照片 URL (需公开)
- `{{TIME}}` / `{{时间}}` - Time / 时间
- `{{DESCRIPTION}}` / `{{描述}}` - Description / 描述
- `{{MOOD}}` / `{{心情}}` - Mood emoji / 心情 emoji

---

### daily-journal (Journal Style / 日记手账)

**Use Case / 适用场景**: PhoenixClaw complete journal / PhoenixClaw 完整日志

**Layout / 布局**:
```
┌─────────────────────┐
│  📅 Date  Weekday   │
│  😊 Mood  ⚡ Energy │
│  ─────────────────  │
│  ✨ Highlights      │
│  • Achievement 1    │
│  • Achievement 2    │
│                     │
│  🖼️ Moments         │
│  [Photos]           │
│                     │
│  💭 Reflections     │
│  Reflection text... │
│                     │
│  🌱 Growth          │
│  Growth notes...    │
└─────────────────────┘
```

**Style Features / 样式特点**:
- Beige paper background / 米黄色纸质背景
- Hand-drawn borders / 手绘风格边框
- Sticker-style emojis / 贴纸式 emoji
- Multi-column layout / 分栏布局

**Variables / 变量**:
- `{{DATE}}` / `{{日期}}` - Date / 日期
- `{{WEEKDAY}}` / `{{星期}}` - Weekday / 星期
- `{{MOOD}}` / `{{心情}}` - Mood / 心情
- `{{ENERGY}}` / `{{能量}}` - Energy / 能量
- `{{HIGHLIGHTS}}` / `{{亮点}}` - Highlights list / 亮点列表
- `{{MOMENTS}}` / `{{瞬间}}` - Moments list / 瞬间列表
- `{{REFLECTIONS}}` / `{{反思}}` - Reflections / 反思
- `{{GROWTH}}` / `{{成长}}` - Growth notes / 成长笔记

---

### social-share (Social Card / 社交分享)

**Use Case / 适用场景**: Sharing highlights/achievements / 分享亮点/成就

**Layout / 布局**:
```
┌─────────────────────────────┐
│                             │
│        ✨ Highlights        │
│                             │
│    "Milestone achieved"     │
│                             │
│    📊 3 tasks done          │
│    🎯 95% efficiency        │
│                             │
│         [Logo]              │
└─────────────────────────────┘
```

**Style Features / 样式特点**:
- 1200x630 landscape layout / 1200x630 横向布局
- Gradient background / 渐变背景
- Large title + statistics / 大标题 + 统计数据
- Bottom brand mark / 底部品牌标识

**Variables / 变量**:
- `{{TITLE}}` / `{{标题}}` - Title / 标题
- `{{SUBTITLE}}` / `{{副标题}}` - Subtitle / 副标题
- `{{STATS}}` / `{{统计}}` - Statistics / 统计数据
- `{{DATE}}` / `{{日期}}` - Date / 日期

---

### dashboard (Data Dashboard / 数据仪表盘)

**Use Case / 适用场景**: Weekly/monthly summaries / 周/月度汇总

**Layout / 布局**:
```
┌──────────────────────────────────────┐
│  📊 Week Summary      2026-W05       │
│  ─────────────────────────────────── │
│  [Mood Trend]  [Energy Dist]         │
│                                      │
│  Key Metrics / 关键指标:             │
│  ✅ Done: 15  📝 Journal: 7          │
│                                      │
│  Timeline / 时间线:                  │
│  Mon → Tue → Wed → Thu → Fri         │
└──────────────────────────────────────┘
```

**Style Features / 样式特点**:
- Dark background / 深色背景
- Data visualization / 数据可视化
- Timeline display / 时间线展示
- Key metrics cards / 关键指标卡片

**Variables / 变量**:
- `{{PERIOD}}` / `{{周期}}` - Period (This Week/Month / 本周/本月)
- `{{DATE_RANGE}}` / `{{日期范围}}` - Date range / 日期范围
- `{{MOOD_DATA}}` / `{{心情数据}}` - Mood data / 心情数据
- `{{ENERGY_DATA}}` / `{{能量数据}}` - Energy data / 能量数据
- `{{STATS}}` / `{{统计}}` - Statistics / 统计数据
- `{{TIMELINE}}` / `{{时间线}}` - Timeline events / 时间线事件

## 🔧 Configuration / 配置说明

### Prerequisites / 前置要求

1. **Install Dependencies / 安装依赖**:
   ```bash
   cd skills/openclaw-visual
   npm install
   ```

2. **(Optional) Install Playwright / (可选) 安装 Playwright** - For advanced rendering / 用于高级渲染:
   ```bash
   npm install playwright
   npx playwright install chromium
   ```

### Optional Configuration / 可选配置

In `~/.openclaw/visual/config.yaml` / 在配置文件中：

```yaml
# Default template / 默认模板
default_template: "quote-card"

# Default theme / 默认配色主题
default_theme: "light"  # light/dark/accent/blue

# Renderer / 渲染引擎
renderer: auto  # auto | nodejs | playwright
# auto mode: defaults to nodejs, switches to playwright for "beautiful/complex" requests
# auto 模式: 默认 nodejs, 用户要求"精美/复杂"时自动切换 playwright

# Output settings / 输出设置
output:
  path: "~/OpenClaw/Visuals/"
  format: "png"  # png | jpeg
  quality: 90    # JPEG quality (1-100) / JPEG 质量
```

## 💡 Usage Examples / 使用示例

### Example 1: Quote Card / 示例 1: 金句卡片

[EN] User: "Make this into an image: 'Action cures fear'"

[ZH] 用户: "帮我把这句话做成图片: '行动是治愈恐惧的良药'"

AI:
1. Recognize as quote type / 识别为金句类型
2. Select `quote-card` template / 选择 `quote-card` 模板
3. Generate HTML / 生成 HTML 内容
4. Call script / 调用本地生成脚本:
   ```bash
   node scripts/generate-image.js \
     --template quote-card \
     --content '{"QUOTE":"Action cures fear","AUTHOR":"William James","THEME":"light"}' \
     --output ~/OpenClaw/Visuals/quote-20240201.png
   ```
5. Read generated image and send / 读取生成的图片文件，在聊天窗口发送给用户

### Example 2: Journal Visualization / 示例 2: 日志可视化

[EN] User: "Generate today's journal image"

[ZH] 用户: "生成今天的日志分享图"

AI:
1. Read `~/PhoenixClaw/Journal/daily/2026-02-01.md` / 读取日志文件
2. Parse content / 解析内容
3. Select `daily-journal` or `social-share` template / 选择模板
4. Generate and send / 生成并发送图片

### Example 3: Chat Summary / 示例 3: 聊天记录总结

[EN] User: "Make a summary image of today's conversation"

[ZH] 用户: "把今天的对话做成总结图"

AI:
1. Scan `~/.openclaw/sessions/` today's records / 扫描今日记录
2. Extract key topics and decisions / 提取关键话题和决策
3. Select `dashboard` or `social-share` template / 选择模板
4. Generate and send / 生成并发送图片

## 📚 Reference Docs / 参考文档

- `references/templates.md` - Template design specs / 模板设计规范
- `references/content-parsing.md` - Content parsing rules / 内容解析规则
- `references/rendering-setup.md` - Local rendering config / 本地渲染配置
- `references/i18n.md` - Internationalization guide / 国际化指南

## 🎨 Extension Development / 扩展开发

### Adding New Templates / 添加新模板

1. Create new `.html` file in `assets/templates/` / 在目录创建新的 `.html` 文件
2. Define template variable placeholders / 定义模板变量占位符
3. Add documentation in `references/templates.md` / 添加文档
4. Update template selection logic / 更新模板选择逻辑

### Adding New Themes / 添加新主题

1. Define new color scheme in CSS / 在 CSS 中定义新的配色方案
2. Update theme options in `config.yaml` / 更新主题选项
3. Pass `{{THEME}}` variable when selecting template / 在模板选择时传入变量

---

## Design Principles / 设计原则

### Visual Style / 视觉风格
- **Minimalism / 极简主义**: Remove excess decoration, ample whitespace / 去除多余装饰，留白充足
- **Swiss Style / 瑞士风格**: Grid systems, clear hierarchy / 网格系统，清晰层级
- **Editorial Typography / 编辑排版**: Large headlines, refined details / 大字号标题，精致细节

### Color Scheme / 配色方案
- **Primary / 主色**: #1a1a1a (Dark gray / 深灰)
- **Secondary / 辅色**: #525252, #737373, #a3a3a3 (Grayscale / 灰度)
- **Background / 背景**: #fafafa, #f5f5f5 (Off-white / 米白)
- **Accent / 强调**: #ea580c (Orange-red / 橙红), #4f46e5 (Indigo / 靛蓝)

### Icon System / 图标系统
Use Lucide-style SVG icons instead of emoji / 使用 Lucide 风格 SVG 图标，替代所有 emoji：
- All icons inline in HTML / 所有图标内联在 HTML 中
- Uniform stroke-width: 1.5
- Size control via CSS / 支持通过 CSS 控制大小

### Font Strategy / 字体策略
- Use system font stack, no external fonts / 使用系统字体栈，无需加载外部字体
- Chinese / 中文: system-ui, PingFang SC, Microsoft YaHei
- English / 英文: system-ui, Segoe UI, Roboto, Helvetica Neue

---

*OpenClaw Visual - Every record deserves to be seen / 让每一条记录都值得被看见*
