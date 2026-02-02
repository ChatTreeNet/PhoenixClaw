# PhoenixClaw Test Suite

This directory contains test cases for PhoenixClaw and its plugins.

## Structure

```
tests/
├── README.md           # This file
├── core/               # PhoenixClaw Core tests
│   ├── README.md
│   ├── mock-memory/
│   └── expected-output/
│
└── ledger/             # PhoenixClaw Ledger plugin tests
    ├── README.md
    ├── mock-memory/
    ├── mock-screenshots/
    └── expected-output/
```

## Running All Tests

```bash
# Test Core
openclaw skill test phoenixclaw \
  --memory tests/core/mock-memory/ \
  --output tests/core/actual-output/

# Test Ledger
openclaw skill test phoenixclaw-ledger \
  --memory tests/ledger/mock-memory/ \
  --screenshots tests/ledger/mock-screenshots/ \
  --output tests/ledger/actual-output/

# Verify all outputs
diff -r tests/core/expected-output/ tests/core/actual-output/
diff -r tests/ledger/expected-output/ tests/ledger/actual-output/
```

## Test Data Guidelines

### Mock Memory Files

- Use realistic conversation patterns
- Include timestamps for each interaction
- Mix of different interaction types
- Multi-language content supported

### Expected Output Files

- Must match exact Obsidian formatting
- YAML frontmatter required
- Use correct emoji conventions
- Follow template structures

## Adding New Plugin Tests

1. Create `tests/{plugin-name}/` directory
2. Add `mock-memory/` with test conversations
3. Add `expected-output/` with expected files
4. Create `README.md` documenting test cases
5. Update this file's structure section
