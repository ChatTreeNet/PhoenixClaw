# 🔥 PhoenixClaw (凤凰涅槃)

**True passive personal growth journaling for OpenClaw.**

PhoenixClaw automatically transforms your daily conversations into beautiful, insightful journals using AI semantic understanding. No tags, no triggers, no user action required.

🔥 *凤凰涅槃 - Like the Phoenix, find rebirth through daily reflection.*

## ✨ Features

- **🤖 Zero-Tag Architecture**: AI automatically identifies journal-worthy moments from ALL conversations
- **📸 Multi-Channel Photo Support**: Handles photos from Telegram, WhatsApp, Discord, CLI with AI vision descriptions
- **🎨 Beautiful Obsidian-Compatible Output**: Markdown with YAML frontmatter, bidirectional links, callouts
- **📊 Pattern Recognition**: Detects themes, mood shifts, energy levels automatically
- **🔧 User-Configurable**: Customizable journal path, timezone, language
- **⏰ Fully Passive**: Nightly cron job runs automatically - just live your life

## 📁 Project Structure

```
PhoenixClaw/
├── skills/phoenixclaw/           # The skill (packageable)
│   ├── SKILL.md                  # Core skill (~70 lines)
│   ├── references/               # 7 detailed reference files
│   │   ├── obsidian-format.md
│   │   ├── skill-recommendations.md
│   │   ├── profile-evolution.md
│   │   ├── visual-design.md
│   │   ├── media-handling.md
│   │   ├── cron-setup.md
│   │   └── user-config.md
│   └── assets/                   # 5 template files
│       ├── daily-template.md
│       ├── weekly-template.md
│       ├── profile-template.md
│       ├── timeline-template.md
│       └── growth-map-template.md
├── tests/                        # Test data (not packaged)
│   ├── mock-memory/
│   └── expected-output/
└── dist/                         # Packaged skill output
```

## 🚀 Installation

### Prerequisites
- OpenClaw installed and configured
- Access to `memory_search` and `memory_get` tools
- Cron system enabled

### Install from Clawdhub

PhoenixClaw is published on Clawdhub:
https://www.clawhub.ai/goforu/phoenixclaw

Recommended installation is via the Clawdhub CLI:

```bash
npm i -g clawhub
# or: pnpm add -g clawhub

clawhub install goforu/phoenixclaw
```

### Install from Package

```bash
# Package the skill
python ~/.agents/skills/skill-creator/scripts/package_skill.py \
  skills/phoenixclaw \
  dist/

# Install in OpenClaw
openclaw skill install dist/phoenixclaw.skill
```

### First-Time Setup

On first use, PhoenixClaw will ask:

```
Welcome to PhoenixClaw! 🔥

Where would you like to store your journals?
[Default: ~/PhoenixClaw/Journal]

Your timezone: [Auto-detected: Asia/Shanghai]
Your language: [Auto-detected: zh-CN]
```

Configuration is saved to `~/.phoenixclaw/config.yaml`.

### Enable Automatic Journaling

Set up the nightly cron job:

```bash
openclaw cron add \
  --name "PhoenixClaw nightly reflection" \
  --cron "0 22 * * *" \
  --tz "auto" \
  --session isolated \
  --message "PhoenixClaw nightly task..."
```

See `references/cron-setup.md` for details.

## 📝 Usage

### Passive Mode (Default)

Just live your life. PhoenixClaw runs automatically at 10 PM daily:
- Scans your day's conversations
- Identifies meaningful moments
- Generates beautiful journal entries
- Updates timeline and growth maps

### Explicit Triggers

You can also ask PhoenixClaw directly:

- *"Show me my journal"* / *"What did I do today?"*
- *"Analyze my patterns"* / *"How am I doing?"*
- *"Generate weekly summary"*
- *"Update my PhoenixClaw settings"*

### Output Structure

```
~/PhoenixClaw/Journal/
├── daily/
│   └── 2026-02-01.md           # Daily journals
├── weekly/
│   └── 2026-W05.md             # Weekly summaries
├── monthly/
│   └── 2026-02.md              # Monthly reviews
├── assets/
│   └── 2026-02-01/             # Photo storage
│       ├── img_001.jpg
│       └── img_002.jpg
├── profile.md                   # Evolving personality profile
├── timeline.md                  # Key events index
└── growth-map.md                # Themes and patterns
```

## 🧪 Testing

### Run Mock Tests

```bash
# Test with mock memory data
openclaw skill test phoenixclaw \
  --memory tests/mock-memory/ \
  --output tests/actual-output/
```

### Verify Output

```bash
diff tests/expected-output/ tests/actual-output/
```

### Test Data

- `tests/mock-memory/2026-02-01.md` - Normal day with photos
- `tests/mock-memory/2026-02-02.md` - Milestone day (promotion)
- `tests/mock-memory/2026-02-03.md` - Empty day (tests NO_REPLY)

## 📚 Documentation

- **SKILL.md**: Core skill definition and workflow
- **references/**: Detailed implementation guides
- **assets/**: Template files for generated content

## 🏗️ Architecture

### Zero-Tag Philosophy

Traditional journaling fails because of friction. PhoenixClaw removes all friction:

1. **No manual tagging**: AI semantically understands what's journal-worthy
2. **No user action**: Runs automatically via cron
3. **No format decisions**: Beautiful output generated automatically

### Core Workflow

1. Check/Create user configuration
2. Read memory file for the day
   - If daily memory is missing or sparse, fallback to session logs (paths implementation-dependent) to reconstruct context.
3. Identify journal-worthy moments (decisions, emotions, milestones, photos)
4. Recognize patterns (themes, mood shifts, energy)
5. Generate daily journal with beautiful layout
6. Update timeline for significant events
7. Update growth-map for new patterns
8. Evolve user profile

## 🤝 Contributing

This is a skill for the OpenClaw ecosystem. Contributions welcome!

## 📄 License

MIT License - See LICENSE file for details.

---

*PhoenixClaw - 凤凰涅槃，浴火重生。*
*Every day is an opportunity for rebirth.*
