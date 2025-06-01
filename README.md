# 🛒 Event Notifier - Advanced AI-Powered E-commerce Recovery System

A sophisticated abandoned cart recovery platform leveraging **Agentic AI**, **background workers**, and **intelligent cron scheduling** to maximize conversion rates through personalized, psychologically-optimized marketing messages.

## 🌟 Key Features

### 🤖 **Agentic AI Marketing Intelligence**
- **Advanced LLM Integration**: Google Gemini 1.5 Flash for creative message generation
- **Behavioral Psychology Engine**: 4 adaptive strategies (Value, Social, Urgency, Scarcity)
- **Neuromarketing Optimization**: 11+ psychological triggers (Loss Aversion, Social Proof, Anchoring)
- **Multi-language Support**: English + Hinglish with cultural adaptation
- **Dynamic Strategy Selection**: Auto-selects optimal approach based on cart value & item count

### ⚡ **Background Workers & Automation**
- **Inngest-Powered Workflows**: Event-driven architecture for reliable message delivery
- **90-Minute Delayed Execution**: Optimal timing based on e-commerce research
- **Intelligent Cancellation**: Auto-cancels if purchase completed during wait period
- **Retry Mechanisms**: Built-in fault tolerance and error handling
- **Step-by-Step Processing**: Purchase verification → AI generation → Multi-channel delivery

### 📱 **Multi-Channel Communication**
- **Smart Email Templates**: Rich HTML with product showcase and urgency elements
- **SMS Optimization**: 120-character limit with maximum impact messaging
- **WhatsApp Integration**: Twilio-powered with emoji and formatting optimization
- **Channel-Specific Adaptation**: Message format optimized per platform

### 🎯 **Advanced Personalization Engine**
- **Customer Segmentation**: Name-based personalization with fallback strategies
- **Cart Analysis**: Intelligent product grouping and value proposition creation
- **Cultural Localization**: Hinglish support for Indian market penetration
- **Purchase History Simulation**: Ready for integration with user behavior data

## 🏗️ **System Architecture**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Mobile App    │ ── │   Express API    │ ── │  Background     │
│  (React Native) │    │  (TypeScript)    │    │  Workers        │
│                 │    │                  │    │  (Inngest)      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                       ┌────────┴────────┐              │
                       │                 │              │
                ┌──────▼──────┐   ┌─────▼─────┐        │
                │   Redis     │   │    AI     │        │
                │ Rate Limit  │   │  Service  │        │
                │   Cache     │   │ (Gemini)  │        │
                └─────────────┘   └───────────┘        │
                                                       │
                ┌──────────────────────────────────────▼───┐
                │          Notification Services           │
                │  ┌──────┐  ┌──────┐  ┌───────────────┐  │
                │  │Email │  │ SMS  │  │   WhatsApp    │  │
                │  │(SMTP)│  │(Twilio) │  (Twilio)    │  │
                │  └──────┘  └──────┘  └───────────────┘  │
                └──────────────────────────────────────────┘
```

## 🚀 **Quick Start**

### **Server Setup**

1. **Clone & Install**:
   ```bash
   cd server
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.sample .env
   # Configure your API keys and credentials
   ```

3. **Required Services**:
   - **Redis Cloud**: For rate limiting and caching
   - **Google AI API**: For LLM-powered message generation  
   - **Twilio**: For SMS/WhatsApp delivery
   - **SMTP Provider**: For email delivery (Mailtrap for testing)

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

### **Mobile App Setup**

1. **Navigate & Install**:
   ```bash
   cd mobile/EventNotifier
   npm install
   ```

2. **Environment Setup**:
   ```bash
   echo "REACT_APP_API_URL=http://localhost:5001/api" > .env
   ```

3. **Launch Application**:
   ```bash
   npm start
   npm run ios    # or npm run android
   ```

## 🛠️ **Advanced Configuration**

### **AI Strategy Configuration**
```typescript
// Automatic strategy selection based on cart characteristics
- Value Strategy: Cart > 1000 → ROI justification
- Social Strategy: 4+ items → Trending/popularity focus  
- Urgency Strategy: Cart < 300 → Time-based pressure
- Scarcity Strategy: Default → Limited availability
```

### **Inngest Workflow Triggers**
```typescript
// Event-driven abandoned cart recovery
POST /api/cart/abandoned → Triggers 90-minute workflow
├── Step 1: Sleep for 90 minutes
├── Step 2: Check purchase status  
└── Step 3: Generate & send AI message
```

### **Multi-Language Support**
```typescript
// Hinglish localization example
Input: { language: "hindi", userName: "प्रिया" }
Output: "नमस्ते प्रिया! 🛒 Aapka cart mein 3 items waiting hain..."
```

## 📊 **Testing & API Documentation**

### **Postman Collection**
Import `Event_Notifier_Updated.postman_collection.json` for comprehensive testing:
- ✅ Health checks and authentication
- ✅ Email/SMS/WhatsApp delivery testing  
- ✅ Hindi/Hinglish language validation
- ✅ All 4 AI strategy testing
- ✅ Error handling verification

### **Rate Limiting**
- **Default**: 2 requests per 60 seconds per user/IP
- **Redis-backed**: Distributed rate limiting with automatic cleanup
- **Graceful Degradation**: Detailed error responses with retry timing

## 🔧 **Technical Stack**

### **Backend Technologies**
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript for type safety
- **Background Jobs**: Inngest for workflow automation  
- **AI/LLM**: Google Generative AI (Gemini 1.5)
- **Communication**: Twilio (SMS/WhatsApp), NodeMailer (Email)
- **Caching**: Redis for rate limiting and session management
- **Validation**: Comprehensive request/response validation

### **Frontend Technologies**  
- **Framework**: React Native with TypeScript
- **Styling**: NativeWind (TailwindCSS for React Native)
- **State Management**: React Context/Hooks
- **Navigation**: React Navigation
- **HTTP Client**: Axios for API communication

### **DevOps & Infrastructure**
- **Process Management**: Nodemon for development
- **Code Quality**: TypeScript strict mode, ESLint ready
- **Testing**: Postman collection with 15+ test scenarios
- **Deployment Ready**: Environment-based configuration

## 🎯 **Key Innovation Highlights**

1. **🧠 Psychological Triggers**: Implementation of 11 advanced neuromarketing principles
2. **⏰ Optimal Timing**: 90-minute delay based on e-commerce conversion research  
3. **🌐 Cultural Adaptation**: Hinglish support for Indian market expansion
4. **🔄 Fault Tolerance**: Multi-step workflow with automatic retry and cancellation
5. **📈 Conversion Optimization**: Strategy selection algorithm based on cart characteristics
6. **🎨 Creative AI**: Dynamic message generation with personality and brand voice adaptation

## 📁 **Project Structure**

```
event_notifier/
├── mobile/                 # React Native application
├── server/                 # Node.js backend with AI integration
│   ├── src/
│   │   ├── agents/         # Inngest background workers
│   │   ├── controllers/    # API route handlers  
│   │   ├── services/       # AI, Email, SMS, Notification services
│   │   ├── middleware/     # Rate limiting, logging
│   │   └── models/         # TypeScript type definitions
│   └── Event_Notifier_Updated.postman_collection.json
└── README.md
```

## 🚀 **Future Roadmap**

- [ ] **Advanced Analytics**: Conversion tracking and A/B testing dashboard
- [ ] **ML Enhancement**: Customer behavior prediction models
- [ ] **Multi-tenant Support**: SaaS-ready architecture  
- [ ] **Real-time Notifications**: WebSocket integration for instant updates
- [ ] **Advanced Segmentation**: Customer lifecycle stage-based messaging 