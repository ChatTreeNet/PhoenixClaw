# PhoenixClaw Ledger Test Suite

This directory contains test cases for the PhoenixClaw Ledger plugin.

## Directory Structure

```
tests/ledger/
├── README.md                    # This file
├── mock-memory/                 # Simulated conversation data
│   ├── 2026-02-05.md           # Day with income + multiple expenses
│   ├── 2026-02-06.md           # Day with large purchase + repayment
│   └── 2026-02-07.md           # Quiet day with subscription renewal
│
├── mock-screenshots/            # Payment screenshot metadata
│   └── README.md               # Describes simulated screenshots
│
└── expected-output/             # Expected generated files
    ├── ledger.yaml             # Structured transaction data
    ├── budget.yaml             # Budget state and alerts
    ├── daily/                  # Expected journal entries
    │   ├── 2026-02-05.md
    │   ├── 2026-02-06.md
    │   └── 2026-02-07.md
    └── finance/
        └── monthly/
            └── 2026-02.md      # Expected monthly report
```

## Test Scenarios

### 1. Expense Detection (2026-02-05)

Tests the ability to detect expenses from:
- **Conversation**: Direct mentions ("spent 150", "cost me 28 yuan")
- **Screenshots**: WeChat Pay, Alipay receipts
- **Mixed sources**: Same transaction mentioned in both

**Expected detections:**
| Time | Source | Amount | Category |
|------|--------|--------|----------|
| 08:15 | Screenshot | ¥28 | Food (Coffee) |
| 12:30 | Conversation | ¥150 | Food (Restaurant) |
| 14:45 | Screenshot | ¥86 | Food (Groceries) |
| 18:30 | Conversation | ¥35 | Transport |
| 20:00 | Conversation | ¥50 | Subscription |
| 21:30 | Conversation | +¥15,000 | Income |

### 2. Large Purchase (2026-02-06)

Tests handling of:
- **High-value transactions**: ¥2,199 headphones
- **Discount detection**: Original ¥104 → ¥89 with discount
- **Income types**: Friend repayment vs salary

**Expected alerts:**
- Category budget exceeded (Shopping: 275%)
- Large purchase notification

### 3. Low Activity Day (2026-02-07)

Tests edge cases:
- **Minimal spending**: Only 2 transactions
- **Subscription auto-renewal**: Detected from conversation
- **Recurring expense flagging**: Gym membership

**Expected insights:**
- Subscription review recommendation
- Low-spend day pattern

### 4. Budget Tracking

Tests budget calculations:
- Monthly budget: ¥5,000
- Total spent: ¥3,011 (60%)
- Category breakdown with over/under status
- Pace analysis (spending faster than time elapsed)

## Running Tests

```bash
# Run ledger tests
openclaw skill test phoenixclaw-ledger \
  --memory tests/ledger/mock-memory/ \
  --screenshots tests/ledger/mock-screenshots/ \
  --output tests/ledger/actual-output/

# Verify output
diff -r tests/ledger/expected-output/ tests/ledger/actual-output/

# Run specific day
openclaw skill test phoenixclaw-ledger \
  --date 2026-02-05 \
  --memory tests/ledger/mock-memory/2026-02-05.md
```

## Test Coverage

| Feature | Test File | Status |
|---------|-----------|--------|
| Conversation expense detection | 2026-02-05.md | ✅ |
| Screenshot OCR extraction | mock-screenshots/ | ✅ |
| Multi-language amounts | 2026-02-05.md | ✅ |
| Income detection | 2026-02-05.md, 2026-02-06.md | ✅ |
| Discount extraction | 2026-02-05.md, 2026-02-06.md | ✅ |
| Category mapping | All days | ✅ |
| Budget alerts | budget.yaml | ✅ |
| Monthly report | 2026-02.md | ✅ |
| Recurring detection | 2026-02-07.md | ✅ |
| Deduplication | 2026-02-05.md | ✅ |

## Adding New Tests

1. Create mock memory file in `mock-memory/YYYY-MM-DD.md`
2. Add screenshot metadata in `mock-screenshots/README.md`
3. Create expected outputs in `expected-output/`
4. Update this README with new test scenarios
