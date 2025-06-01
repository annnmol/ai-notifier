# Event Notifier - Abandoned Cart System

A React Native mobile app with a Node.js backend for handling abandoned cart notifications using AI-generated messages.

## Project Structure

```
.
├── mobile/           # React Native mobile app
│   └── EventNotifier/
│       ├── src/
│       │   ├── components/
│       │   ├── screens/
│       │   └── services/
│       └── ...
└── server/          # Node.js backend
    └── src/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── routes/
        └── services/
```

## Prerequisites

- Node.js 16+
- Redis server
- React Native development environment setup
- Google AI (Gemini) API key
- SMTP server credentials

## Setup

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   REDIS_URL=redis://localhost:6379
   GOOGLE_AI_API_KEY=your_api_key_here
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_specific_password
   RATE_LIMIT_POINTS=2
   RATE_LIMIT_DURATION=60
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Mobile App Setup

1. Navigate to the mobile app directory:
   ```bash
   cd mobile/EventNotifier
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:3000/api
   ```

4. Start the Metro bundler:
   ```bash
   npm start
   ```

5. Run on iOS or Android:
   ```bash
   npm run ios
   # or
   npm run android
   ```

## Features

- Shopping cart with item quantity management
- Add random items to cart
- Simulate abandoned cart notifications
- Rate-limited API endpoints
- AI-generated personalized messages
- Email notifications

## Technical Stack

### Mobile App
- React Native
- TypeScript
- NativeWind (TailwindCSS)

### Backend
- Node.js with Express
- TypeScript
- Redis for rate limiting
- Google AI (Gemini) for message generation
- Nodemailer for email notifications 