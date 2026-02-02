# PhoenixClaw

**True passive personal growth journaling for OpenClaw.**

PhoenixClaw automatically transforms your daily conversations into beautiful, insightful journals using AI semantic understanding. No tags, no triggers, no user action required.

## Features

- **Zero-Tag Architecture**: AI automatically identifies journal-worthy moments from ALL conversations
- **Multi-Channel Photo Support**: Handles photos from Telegram, WhatsApp, Discord, CLI with AI vision descriptions
- **Beautiful Obsidian-Compatible Output**: Markdown with YAML frontmatter, bidirectional links, callouts
- **Pattern Recognition**: Detects themes, mood shifts, energy levels automatically
- **Plugin System**: Extensible via plugins (e.g., PhoenixClaw Ledger for finance tracking)
- **Fully Passive**: Nightly cron job runs automatically - just live your life

## Project Structure

```
PhoenixClaw/
├── skills/
│   ├── phoenixclaw/              # Core Skill
│   │   ├── SKILL.md              # Entry point
│   │   ├── references/           # 8 reference files
│   │   │   ├── obsidian-format.md
│   │   │   ├── skill-recommendations.md
│   │   │   ├── profile-evolution.md
│   │   │   ├── visual-design.md
│   │   │   ├── media-handling.md
│   │   │   ├── cron-setup.md
│   │   │   ├── user-config.md
│   │   │   └── plugin-protocol.md    # Plugin architecture
│   │   └── assets/               # 5 templates
│   │
│   └── phoenixclaw-ledger/       # Finance Plugin
│       ├── SKILL.md
│       ├── references/           # 7 reference files
│       │   ├── expense-detection.md
│       │   ├── payment-screenshot.md
│       │   ├── merchant-category-map.md
│       │   ├── category-rules.md
│       │   ├── budget-tracking.md
│       │   ├── financial-insights.md
│       │   └── cron-setup.md
│       └── assets/               # 4 templates
│
├── tests/
│   ├── core/                     # Core skill tests
│   │   ├── mock-memory/
│   │   └── expected-output/
│   └── ledger/                   # Ledger plugin tests
│       ├── mock-memory/
│       ├── mock-screenshots/
│       └── expected-output/
│
└── dist/                         # Packaged .skill files
```

## Installation

### Prerequisites

- OpenClaw installed and configured
- Access to `memory_search` and `memory_get` tools
- Cron system enabled

### Install from Clawdhub

```bash
# Install CLI
npm i -g clawhub

# Install Core
clawhub install goforu/phoenixclaw

# Install Ledger Plugin (optional)
clawhub install goforu/phoenixclaw-ledger
```

### Install from Package

```bash
# Package and install Core
python ~/.agents/skills/skill-creator/scripts/package_skill.py skills/phoenixclaw dist/
openclaw skill install dist/phoenixclaw.skill

# Package and install Ledger (optional)
python ~/.agents/skills/skill-creator/scripts/package_skill.py skills/phoenixclaw-ledger dist/
openclaw skill install dist/phoenixclaw-ledger.skill
```

### First-Time Setup

On first use, PhoenixClaw will ask:

```
Welcome to PhoenixClaw!

Where would you like to store your journals?
[Default: ~/PhoenixClaw/Journal]

Your timezone: [Auto-detected: Asia/Shanghai]
Your language: [Auto-detected: zh-CN]
```

Configuration is saved to `~/.phoenixclaw/config.yaml`.

### Enable Automatic Journaling

```bash
# Core: Nightly journal generation
openclaw cron add \
  --name "PhoenixClaw nightly reflection" \
  --cron "0 22 * * *" \
  --tz "auto" \
  --session isolated \
  --message "PhoenixClaw nightly task..."

# Ledger: Monthly financial report (if installed)
openclaw cron add \
  --name "PhoenixClaw Ledger monthly report" \
  --cron "0 8 1 * *" \
  --tz "auto" \
  --session isolated \
  --message "Generate monthly financial report for the previous month."
```

## Usage

### Passive Mode (Default)

Just live your life. PhoenixClaw runs automatically at 10 PM daily:
- Scans your day's conversations
- Identifies meaningful moments
- Generates beautiful journal entries
- Updates timeline and growth maps
- Extracts financial transactions (with Ledger plugin)

### Explicit Triggers

You can also ask PhoenixClaw directly:

- *"Show me my journal"* / *"What did I do today?"*
- *"Analyze my patterns"* / *"How am I doing?"*
- *"Generate weekly summary"*
- *"How much did I spend this month?"* (with Ledger)

### Output Structure

```
~/PhoenixClaw/
├── Journal/
│   ├── daily/
│   │   └── 2026-02-01.md           # Daily journals
│   ├── weekly/
│   │   └── 2026-W05.md             # Weekly summaries
│   ├── assets/
│   │   └── 2026-02-01/             # Photos & receipts
│   ├── profile.md                   # Evolving personality
│   ├── timeline.md                  # Key events index
│   └── growth-map.md                # Themes and patterns
│
└── Finance/                         # Ledger plugin output
    ├── ledger.yaml                  # Transaction data
    ├── budget.yaml                  # Budget config
    └── monthly/
        └── 2026-02.md               # Monthly reports
```

## Plugins

### PhoenixClaw Ledger

Passive financial tracking that extracts expenses from conversations and payment screenshots.

**Features:**
- Semantic expense detection (multi-language)
- Payment screenshot OCR (WeChat Pay, Alipay, etc.)
- Smart categorization
- Budget tracking with alerts
- Monthly financial reports

**Installation:**
```bash
clawhub install goforu/phoenixclaw-ledger
```

See `skills/phoenixclaw-ledger/SKILL.md` for details.

### Creating Plugins

Plugins hook into PhoenixClaw's pipeline via the plugin protocol:

```yaml
---
name: phoenixclaw-{your-plugin}
depends: phoenixclaw
hook_point: post-moment-analysis
export_to_journal: true
---
```

See `skills/phoenixclaw/references/plugin-protocol.md` for the full specification.

## Testing

### Run Tests

```bash
# Test Core
openclaw skill test phoenixclaw \
  --memory tests/core/mock-memory/ \
  --output tests/core/actual-output/

# Verify Core output
diff -r tests/core/expected-output/ tests/core/actual-output/

# Test Ledger
openclaw skill test phoenixclaw-ledger \
  --memory tests/ledger/mock-memory/ \
  --output tests/ledger/actual-output/

# Verify Ledger output
diff -r tests/ledger/expected-output/ tests/ledger/actual-output/
```

### Test Data

**Core tests:**
- `2026-02-01.md` - Normal day with photos
- `2026-02-02.md` - Milestone day (presentation success)
- `2026-02-03.md` - Quiet day

**Ledger tests:**
- `2026-02-05.md` - Payday with multiple expenses
- `2026-02-06.md` - Large purchase (electronics)
- `2026-02-07.md` - Low-spend day with subscription

## Architecture

### Zero-Tag Philosophy

Traditional journaling fails because of friction. PhoenixClaw removes all friction:

1. **No manual tagging**: AI semantically understands what's journal-worthy
2. **No user action**: Runs automatically via cron
3. **No format decisions**: Beautiful output generated automatically

### Core Workflow

1. Load config or trigger onboarding
2. Retrieve day's memory (fallback to session logs)
3. Identify moments: decisions, emotions, milestones, photos
4. **[Plugins execute]**: Ledger extracts finances, etc.
5. Detect patterns: themes, mood shifts, energy
6. Generate daily journal with plugin sections
7. Update timeline, growth-map, profile

## Documentation

- `SKILL.md`: Core skill definition and workflow
- `references/`: Detailed implementation guides
- `assets/`: Template files for generated content
- `AGENTS.md`: Agent instructions for development

## Contributing

This is a skill for the OpenClaw ecosystem. Contributions welcome!

## License

MIT License - See LICENSE file for details.

---

*PhoenixClaw - Every day is an opportunity for rebirth.*
