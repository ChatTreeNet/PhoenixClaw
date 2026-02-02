# Mock Screenshots Metadata

This file describes the mock payment screenshots for testing.
In production, these would be actual image files analyzed by AI vision.

## 2026-02-05

### receipt_wechat_coffee.jpg
```yaml
filename: receipt_wechat_coffee.jpg
platform: wechat
detected_data:
  type: expense
  amount: 28.00
  currency: CNY
  merchant: "Luckin Coffee"
  timestamp: "2026-02-05T08:15:00"
  payment_method: "WeChat Balance"
  order_id: "4200001234567890"
confidence: 0.95
```

### receipt_alipay_grocery.jpg
```yaml
filename: receipt_alipay_grocery.jpg
platform: alipay
detected_data:
  type: expense
  amount: 86.00
  currency: CNY
  merchant: "Freshippo (Hema)"
  timestamp: "2026-02-05T14:45:00"
  payment_method: "Alipay Balance"
  discount: 10.00
  original_amount: 96.00
confidence: 0.92
```

## 2026-02-06

### receipt_wechat_lunch.jpg
```yaml
filename: receipt_wechat_lunch.jpg
platform: wechat
detected_data:
  type: expense
  amount: 32.00
  currency: CNY
  merchant: "Noodle House"
  timestamp: "2026-02-06T12:00:00"
  payment_method: "WeChat Balance"
confidence: 0.88
```

### receipt_jd_headphones.jpg
```yaml
filename: receipt_jd_headphones.jpg
platform: bank
detected_data:
  type: expense
  amount: 2199.00
  currency: CNY
  merchant: "JD.com"
  timestamp: "2026-02-06T19:00:00"
  payment_method: "Credit Card ****1234"
  order_id: "JD123456789"
confidence: 0.94
```

### receipt_meituan_pizza.jpg
```yaml
filename: receipt_meituan_pizza.jpg
platform: wechat
detected_data:
  type: expense
  amount: 89.00
  currency: CNY
  merchant: "Pizza Hut (Meituan)"
  timestamp: "2026-02-06T21:00:00"
  payment_method: "WeChat Balance"
  discount: 15.00
  original_amount: 104.00
confidence: 0.91
```

## Notes

- All screenshots are simulated for testing purposes
- Confidence scores represent expected OCR accuracy
- Some screenshots have discount information extracted
- Platform detection based on UI pattern recognition
