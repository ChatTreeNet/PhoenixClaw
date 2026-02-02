# AGENTS.md - PhoenixClaw

> Agent instructions for PhoenixClaw - a passive journaling skill for OpenClaw that transforms daily conversations into Obsidian-compatible journals using AI semantic understanding.

## Project Overview

PhoenixClaw is a **skill** (not traditional code) for the OpenClaw AI ecosystem.

**Key Principles:**
- **Zero-Tag:** AI semantically identifies journal-worthy content - no manual tagging
- **Passive:** Runs via cron at 10 PM daily without user intervention
- **Obsidian-Compatible:** Markdown with YAML frontmatter, callouts, bidirectional links

## Structure

```
skills/
├── phoenixclaw/              # Core skill
│   ├── SKILL.md              # Entry point
│   ├── references/           # Implementation guides (8 files)
│   │   └── plugin-protocol.md  # Plugin architecture
│   └── assets/               # Templates (5 files)
│
└── phoenixclaw-ledger/       # Finance plugin skill
    ├── SKILL.md              # Plugin entry point
    ├── references/           # Finance guides (7 files)
    │   ├── expense-detection.md
    │   ├── payment-screenshot.md
    │   ├── merchant-category-map.md
    │   ├── category-rules.md
    │   ├── budget-tracking.md
    │   ├── financial-insights.md
    │   └── cron-setup.md
    └── assets/               # Finance templates (5 files)
        ├── expense-callout.md
        ├── receipt-callout.md
        ├── daily-finance-section.md
        ├── monthly-report.md
        └── yearly-report.md

└── founder-coach/             # Startup mindset coach skill
    ├── SKILL.md              # Skill entry point
    ├── references/           # Coaching guides (14 files)
    │   ├── user-config.md
    │   ├── profile-evolution.md
    │   ├── weekly-challenge.md
    │   └── weekly-report.md
    └── assets/               # Coaching templates (3 files)
        ├── founder-profile-template.md
        ├── challenge-template.md
        └── weekly-report-template.md

tests/                        # Test suites
├── core/                     # Core skill tests
└── ledger/                   # Ledger plugin tests
dist/                         # Packaged .skill files
```

## Commands

```bash
# Package skill
python ~/.agents/skills/skill-creator/scripts/package_skill.py skills/phoenixclaw dist/

# Install locally
openclaw skill install dist/phoenixclaw.skill

# Test with mock data
openclaw skill test phoenixclaw --memory tests/core/mock-memory/ --output tests/core/actual-output/

# Verify output
diff tests/core/expected-output/ tests/core/actual-output/

# Install from Clawdhub
clawhub install goforu/phoenixclaw

# Package ledger plugin
python ~/.agents/skills/skill-creator/scripts/package_skill.py skills/phoenixclaw-ledger dist/

# Install ledger plugin
openclaw skill install dist/phoenixclaw-ledger.skill

# Test ledger plugin
openclaw skill test phoenixclaw-ledger --memory tests/ledger/mock-memory/ --output tests/ledger/actual-output/

# Package coach skill
python ~/.agents/skills/skill-creator/scripts/package_skill.py skills/founder-coach dist/

# Install coach skill
openclaw skill install dist/founder-coach.skill

# Test coach skill
openclaw skill test founder-coach --memory tests/coach/mock-memory/ --output tests/coach/actual-output/
```

## Markdown Style

### YAML Frontmatter (Required)
```yaml
---
date: YYYY-MM-DD
weekday: Full Day Name
type: daily|weekly|monthly
mood: 😊  # 🌅 ✨ 🌧️ ⚡
energy: high|medium|low
tags: [journal, phoenixclaw]
---
```

### Callout Blocks
```markdown
> [!moment] 🌅 Significant Moment       > [!highlight] ✨ Highlight
> [!reflection] 💭 Reflection           > [!insight] 💡 Insight
> [!milestone] 🎯 Milestone             > [!gallery] 🖼️ Media
```

### Links & Images
```markdown
[[2026-02-01]]                           # Standard link
[[2026-02-01|Today]]                     # Aliased
![[assets/2026-02-01/img_001.jpg|400]]   # Image with size
```

### Image Moment Layout
```markdown
> [!moment] 🍜 12:30 Lunch
> ![[assets/2026-02-01/img_001.jpg|400]]
> Caption describing the moment
```

## Emoji Conventions

Use as **visual anchors** for section headers, not decoration.

| Context | Emojis |
|---------|--------|
| Time | 🌅 Morning, ☀️ Afternoon, 🌇 Evening, 🌙 Night |
| Theme | ✨ Wins, 🖼️ Moments, 💭 Thoughts, 🌱 Growth, 🎯 Goals, 💡 Ideas |

## File Naming

- **Assets:** `~/PhoenixClaw/Journal/assets/YYYY-MM-DD/img_XXX.jpg`
- **Config:** `~/.phoenixclaw/config.yaml`

```yaml
journal_path: ~/PhoenixClaw/Journal
timezone: auto    # or "Asia/Shanghai"
language: auto    # or "zh-CN"
```

## Core Workflow

> **CRITICAL: Execute ALL 9 steps regardless of invocation method (cron OR manual)**

1. Load config or trigger onboarding
2. `memory_get` for today AND **scan ALL session logs** (session files are often split — read all files modified today). Session logs contain image metadata that `memory_get` cannot provide.
3. Identify moments: decisions, emotions, milestones, photos → generates `moments` data structure
4. Detect patterns: themes, mood shifts, energy
5. **Execute plugins** at their hook points (Ledger runs at `post-moment-analysis`)
6. Generate journal using `assets/daily-template.md` — **include all plugin sections**
7. Update `timeline.md` for significant events
8. Update `growth-map.md` for new patterns
9. Evolve `profile.md` with observations

**Common mistakes when manually invoked:**
- ❌ Only calling `memory_get` → misses all photos
- ❌ Skipping step 3 (moment identification) → plugins never trigger
- ❌ Skipping step 5 (plugin execution) → Ledger section missing

## Profile Rules

- **Append-only:** Never overwrite existing observations
- **Confidence:** Low (1x), Medium (3+ or 7 days), High (10+ and 30 days)
- **Sacred:** `user_notes` section - AI must never modify
- **Privacy:** Never record secrets or quote users directly

## Founder Coach Rules

- **Socratic Only:** Ask questions, don't give answers. Guide the founder to their own insights.
- **Mindset Focus:** Focus on thinking patterns and mental models, not business tactics.
- **Max One Intervention:** Max one intervention per anti-pattern per conversation.
- **Just-in-Time:** Only introduce mental models when relevant to the current conversation.
- **Anti-Pattern Detection:** Actively monitor for Excuse Thinking, Fear-Driven Decisions, Founder Trap, Perfectionism, Priority Chaos, and Comfort Zone.

## Mental Model Principles

- **Framework over Advice:** Use PMF Levels, 4Ps, and NFX models to provide structure.
- **Progress Tracking:** Categorize mental model usage as Beginner, Practicing, or Mastered.
- **Weekly Accountability:** Challenges must include 1 mental model practice and 1 action task.

## Skill Recommendations

- Don't recommend on first detection
- 3+ occurrences in 14 days = eligible
- Max 1 new skill per week
- Never re-recommend rejected/installed skills

## Error Handling

**Memory & session scan:** Always scan session logs (`~/.openclaw/sessions/*.jsonl`) alongside daily memory; if `memory_get` is sparse, use session logs to reconstruct context, then update daily memory.

**Embeddings unavailable:** Continue with daily memory, skip cross-day pattern search

**Path errors:** Always resolve to absolute paths, check permissions, explain failures clearly

## Language

- User content follows config language (often `zh-CN`)
- Technical terms in English
- Skill files in English

## Never Commit

```
dist/              # Built artifacts
.sisyphus/         # Agent files
.openclaw/         # Runtime
.agent/            # Sessions
tests/actual-output/
.env
__pycache__/
```
