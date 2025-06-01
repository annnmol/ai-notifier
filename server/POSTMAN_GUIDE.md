# 📋 Postman Collection Guide

## 📁 **Available Collections**

### 1. **Event_Notifier_Updated.postman_collection.json** ✨ *NEW*
**Complete, organized collection with all features**

#### 📂 **Collection Structure:**
```
🏥 Health & Auth
├── Health Check
└── Auth Status

📧 Email Notifications  
└── Email - Standard Cart

📱 SMS Notifications
└── SMS - Character Limit Test (120 chars)

💬 WhatsApp Notifications
└── WhatsApp - English

🇮🇳 Hindi/Hinglish Notifications
├── WhatsApp - Hindi Kitchen Products
├── Email - Hindi
└── SMS - Hindi

🧪 Strategy Testing
├── 💎 Value Strategy - High Cart ($2999+)
├── 👥 Social Strategy - Multi-Item (4+ items)
├── ⚡ Urgency Strategy - Low Value (<$300)
└── 🔥 Scarcity Strategy - Medium Cart

❌ Error Testing
├── Invalid Message Type
└── Missing Required Fields
```

### 2. **Event_Notifier.postman_collection.json** ✅ *UPDATED*
**Original collection with "Premium Customer" removed**

### 3. **Event_Notifier_Enhanced.postman_collection.json** ✅ *UPDATED*
**Enhanced collection with "Premium Customer" removed**

## 🎯 **Quick Test Guide**

### **Basic Testing (Start Here):**
1. **Health Check** - Verify server is running
2. **SMS Character Limit** - Test 120-char optimization
3. **WhatsApp English** - Test standard WhatsApp flow
4. **Email Standard** - Test email with HTML template

### **Hindi Testing:**
1. **WhatsApp Hindi Kitchen** - Test Hinglish with household products
2. **Email Hindi** - Test Hinglish email
3. **SMS Hindi** - Test Hinglish with character limits

### **Strategy Testing:**
- **Value Strategy**: High cart value ($1000+) → ROI focus
- **Social Strategy**: Multi-item cart (4+ items) → Trending focus  
- **Urgency Strategy**: Low value (<$300) → Time pressure
- **Scarcity Strategy**: Medium cart → Limited availability

### **Error Testing:**
- **Invalid Message Type** - Should return 400 error
- **Missing Fields** - Should return validation error

## 🔧 **Environment Variables**
```
baseUrl: http://localhost:5001
userId: user-123
```

## 📞 **Test Numbers & Emails**
- **SMS Sandbox**: +18777804236
- **WhatsApp Sandbox**: +18777804236
- **Email Test**: socialyt664+work@gmail.com
- **Hindi WhatsApp**: +919992622616

## 🚀 **Usage Tips**
1. **Import the Updated collection** for best experience
2. **Start server** before testing: `npm run dev`
3. **Check console logs** for detailed AI generation info
4. **Test Hindi compliance** using the dedicated Hindi test cases
5. **Monitor character limits** especially for SMS

## ✅ **Verified Features**
- ✅ SMS character optimization (120 chars)
- ✅ Hinglish language support
- ✅ All 4 AI strategies working
- ✅ Premium references removed
- ✅ Error handling tested
- ✅ Kitchen/household product focus for Hindi
