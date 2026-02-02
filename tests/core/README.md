# PhoenixClaw Core Test Suite

This directory contains test cases for PhoenixClaw Core journaling functionality.

## Directory Structure

```
tests/core/
├── README.md
├── mock-memory/                 # Simulated conversation data
│   ├── 2026-02-01.md           # Normal day with photos
│   ├── 2026-02-02.md           # Milestone day (presentation success)
│   └── 2026-02-03.md           # Empty/quiet day
│
└── expected-output/             # Expected generated files
    ├── daily/
    │   ├── 2026-02-01.md
    │   └── 2026-02-02.md
    ├── timeline.md
    ├── growth-map.md
    └── profile.md
```

## Test Scenarios

### 1. Normal Day (2026-02-01)

Tests standard journaling:
- Morning check-in with good mood
- Lunch with photo (ramen)
- Work achievement (bug fix)
- Evening photo (sunset)
- Night reflection

**Expected outputs:**
- Highlights: Bug fix achievement
- Moments: 2 photos with captions
- Reflections: Productivity observations
- Growth Notes: Energy patterns

### 2. Milestone Day (2026-02-02)

Tests significant event handling:
- Important presentation
- Positive outcome (praise from boss)
- Career milestone (new project lead)
- Celebration dinner

**Expected outputs:**
- Timeline update with milestone
- Elevated mood indicators
- Growth map pattern updates

### 3. Quiet Day (2026-02-03)

Tests edge cases:
- Minimal conversation
- No significant events
- Tests NO_REPLY behavior

**Expected outputs:**
- Minimal or no journal entry
- No false pattern detection

## Running Tests

```bash
# Run core tests
openclaw skill test phoenixclaw \
  --memory tests/core/mock-memory/ \
  --output tests/core/actual-output/

# Verify output
diff -r tests/core/expected-output/ tests/core/actual-output/

# Run specific day
openclaw skill test phoenixclaw \
  --date 2026-02-01 \
  --memory tests/core/mock-memory/2026-02-01.md
```

## Test Coverage

| Feature | Test File | Status |
|---------|-----------|--------|
| Daily journal generation | 2026-02-01.md | ✅ |
| Photo moment detection | 2026-02-01.md | ✅ |
| Mood/energy inference | All days | ✅ |
| Milestone detection | 2026-02-02.md | ✅ |
| Timeline updates | 2026-02-02.md | ✅ |
| Profile evolution | 2026-02-02.md | ✅ |
| Quiet day handling | 2026-02-03.md | ✅ |
| Obsidian formatting | All outputs | ✅ |
