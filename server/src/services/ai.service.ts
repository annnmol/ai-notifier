// Enhanced AI service for advanced abandoned cart message generation
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Cart } from '../models/types';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GOOGLE_AI_API_KEY) {
  console.warn('Google AI API key not configured. AI message generation will be unavailable.');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Main function for generating advanced abandoned cart messages
export async function generateAbandonedCartMessage(
  cart: Cart, 
  userName?: string, 
  buyLink?: string,
  language?: string,
  messageType?: 'email' | 'sms' | 'whatsapp',
): Promise<string> {
  if (!process.env.GOOGLE_AI_API_KEY) {
    return getFallbackMessage(cart, userName, buyLink, language, messageType);
  }

  try {
    const strategy = getOptimalStrategy(cart.totalAmount, cart.items.length);
    const message = await generateAdvancedMessage(cart, userName, buyLink, strategy, language, messageType);
    
    console.log('🤖 AI Message Generated:', {
      strategy,
      cartValue: cart.totalAmount,
      items: cart.items.length,
      customer: userName || 'Anonymous',
      language: language || 'English',
      messageType: messageType || 'generic'
    });
    
    return message;
  } catch (error) {
    console.error('❌ AI message generation failed:', error);
    return getFallbackMessage(cart, userName, buyLink, language, messageType);
  }
}

// Advanced message generation with behavioral psychology
async function generateAdvancedMessage(
  cart: Cart, 
  userName?: string, 
  buyLink?: string, 
  strategy?: string,
  language?: string,
  messageType?: 'email' | 'sms' | 'whatsapp'
): Promise<string> {
  console.log("language:", language);
  const customerName = userName ? userName : '';
  const nameUsage = userName ? `Customer name: "${customerName}" - use naturally, not as formal greeting` : `No customer name - write personally but generically`;
  const linkText = buyLink ? `Purchase link: ${buyLink}` : `End with "Complete your purchase now!"`;
  
  const cartValue = cart.totalAmount;
  const itemCount = cart.items.length;
  const selectedStrategy = strategy || getOptimalStrategy(cartValue, itemCount);
  
  // SMS-specific character limit handling
  const characterLimit = messageType === 'sms' ? 
    'CRITICAL: Message must be EXACTLY 110-120 characters total. Count every character including emojis and spaces.' : 
    '4 sentences max, strategic line breaks';
  
  const hindiInstruction = language === 'hindi' ? 
    'CRITICAL: Write in HINGLISH only. COPY these exact patterns:\n\n' +
    'REQUIRED STRUCTURE:\n' +
    '• Start: "नमस्ते [name]! 🛒"\n' +
    '• Body: "Aapka cart mein [items] waiting hain. Yeh items jaldi khatam ho jayenge!"\n' +
    '• CTA: "Order now!"\n\n' +
    'MANDATORY WORDS (use exactly): aapka, mein, hain, karo, bahut, ye, sab, jaldi'
    : 'Write in English.';
  
  const smsArchitecture = messageType === 'sms' ? 
    `Line 1: [Emoji] *[Ultra-concise hook]* [Cart summary]
     Line 2: *[CTA]:* ${linkText}
     
     FORMATTING RULES:
     • EXACTLY 110-120 characters total
     • 1 emoji max: 🛒 ⚡ 🔥
     • Bold (*text*) for 1-2 key words only
     • No line breaks within SMS
     • Must include cart value and action` :
    `Line 1: [Emoji] *[Pattern Interrupt Hook]* [Emoji]
     Line 2: [Psychological trigger + value proposition - use *bold* for 1-2 key words]
     Line 3: [Social proof/urgency bridge with emotional resonance]
     Line 4: *[Assumptive CTA with micro-commitment]:* ${linkText}`;
  
  const formatOptimization = messageType === 'whatsapp' ? 'WhatsApp-optimized formatting' : messageType === 'sms' ? 'SMS-optimized: ultra-concise, no line breaks' : 'Email-optimized formatting';
  
  const hindiFormatting = language === 'hindi' ? 
    'HINGLISH RULES:\n' +
    '1. Start with: नमस्ते\n' +
    '2. Use exactly: aapka cart mein\n' +
    '3. End with: jaldi karo\n' +
    '4. Products in English only\n' +
    '5. NO pure English sentences' 
    : '';
  
  const prompt = `Generate an ultra-high-converting abandoned cart message using 2025's most advanced behavioral psychology and neuromarketing techniques.

  🚨 CRITICAL LANGUAGE REQUIREMENT: ${hindiInstruction}

  CUSTOMER CONTEXT:
  ${nameUsage}
  Cart Details: ${itemCount} item(s) - ${cart.items.map(item => `${item.quantity}x ${item.name} ($${item.price})`).join(', ')}
  Total Value: $${cartValue}
  Strategy: ${selectedStrategy.toUpperCase()} focus
  ${messageType === 'sms' ? 'MESSAGE TYPE: SMS - Ultra-concise format required' : `MESSAGE TYPE: ${messageType?.toUpperCase() || 'GENERIC'}`}
  
  NEUROMARKETING FRAMEWORK - ${selectedStrategy.toUpperCase()} APPROACH:
  ${getStrategyPrompt(selectedStrategy)}

  ADVANCED PSYCHOLOGICAL TRIGGERS (combine 3-4):
  ✓ Zeigarnik Effect: Unfinished business creates mental tension
  ✓ Endowment Effect: "Your curated selection" ownership language
  ✓ Loss Aversion: What they'll miss out on (3x stronger than gain)
  ✓ Social Proof Cascading: Multiple validation layers
  ✓ Authority Halo: Expert curation/recommendation
  ✓ Reciprocity Principle: Special consideration/treatment
  ✓ Anchoring Bias: Value comparison and framing
  ✓ Commitment Consistency: Identity-based appeals
  ✓ Curiosity Gap: "Something important about your order..."
  ✓ Status Signaling: "Exclusive access" / "Priority treatment"
  ✓ Peak-End Rule: Strong finish for memory formation

  CONVERSION COPYWRITING MASTERY:
  • Pattern Interrupt: Hook within first 3-5 words
  • Value Stacking: Present items as strategic collection
  • Power Words: reserved, secured, verified, priority, exclusive, curated
  • Micro-Urgency: Time sensitivity without fake scarcity
  • Objection Handling: Address common hesitations subtly
  • Consultative Tone: Advisor, not salesperson
  • Social Validation: Weave in without being obvious
  • Assumptive Close: Expect action, don't beg for it

  MESSAGE ARCHITECTURE:
  ${smsArchitecture}

  FORMATTING RULES:
  • ${characterLimit}
  • 1-2 emojis total: 🔥 ⚡ 💎 🎯 ✨ 🚀 ⏰ 💫 👑 🎪 🛒
  • Bold (*text*) ONLY for: heading + 2 critical action words
  • Strictly no placeholders, templates, or generic language
  • ${formatOptimization}
  ${hindiFormatting}

  Generate a message that feels personally crafted and psychologically irresistible.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Strategy selection based on cart characteristics
function getOptimalStrategy(cartValue: number, itemCount: number): string {
  if (cartValue > 1000) return 'value'; // High-value carts respond to value reinforcement
  if (itemCount > 3) return 'social'; // Multi-item carts benefit from social proof
  if (cartValue < 300) return 'urgency'; // Low-value carts need urgency push
  return 'scarcity'; // Default to scarcity for medium carts
}

// Strategy-specific prompting for maximum conversion
function getStrategyPrompt(strategy: string): string {
  const strategies = {
    scarcity: `
    PRIMARY: Inventory scarcity + time sensitivity
    FOCUS: Limited availability, reserved status, window closing
    PSYCHOLOGY: Fear of missing out + loss aversion amplification
    TONE: Urgent but not panicked, exclusive opportunity`,
    
    value: `
    PRIMARY: Investment justification + comparative value
    FOCUS: ROI demonstration, quality emphasis, smart decision validation
    PSYCHOLOGY: Anchoring bias + status reinforcement + authority
    TONE: Consultative advisor, value positioning`,
    
    social: `
    PRIMARY: Social proof cascading + community belonging
    FOCUS: Others' choices, trending items, group validation
    PSYCHOLOGY: Social proof + bandwagon effect + FOMO
    TONE: Inclusive community, trending awareness`,
    
    urgency: `
    PRIMARY: Time-based action triggers + deadline pressure
    FOCUS: Limited-time benefits, quick decision rewards
    PSYCHOLOGY: Time scarcity + immediate gratification + procrastination combat
    TONE: Helpful reminder, action-oriented, benefit-focused`
  };
  
  return strategies[strategy as keyof typeof strategies] || strategies.scarcity;
}

// Fallback message when AI is unavailable
function getFallbackMessage(cart: Cart, userName?: string, buyLink?: string, language?: string, messageType?: string): string {
  const customerGreeting = userName ? `Hi ${userName}!` : 'Hi there!';
  const itemText = cart.items.length === 1 ? 'item' : 'items';
  const action = buyLink ? `Complete your order: ${buyLink}` : 'Complete your purchase now!';
  
  if (language === 'hindi') {
    const hindiGreeting = userName ? `नमस्ते ${userName}!` : 'नमस्ते!';
    const hindiItemText = cart.items.length === 1 ? 'item' : 'items';
    const hindiAction = buyLink ? `Order complete karo: ${buyLink}` : 'Apni shopping complete karo!';
    
    if (messageType === 'sms') {
      // SMS character limit fallback in Hinglish
      return `${hindiGreeting} Aapke cart mein ${cart.items.length} ${hindiItemText} ($${cart.totalAmount}) waiting hai. ${hindiAction}`;
    }
    
    return `${hindiGreeting} 🛒 Aapke cart mein ${cart.items.length} ${hindiItemText} waiting hain (total $${cart.totalAmount}). ${hindiAction}`;
  }
  
  if (messageType === 'sms') {
    // SMS character limit fallback
    return `${customerGreeting} ${cart.items.length} ${itemText} in cart ($${cart.totalAmount}). ${action}`;
  }
  
  return `${customerGreeting} 🛒 You have ${cart.items.length} ${itemText} waiting in your cart (worth $${cart.totalAmount}). ${action}`;
}

// Legacy function for backward compatibility
export async function generateCartMessage(cart: Cart): Promise<string> {
  return generateAbandonedCartMessage(cart);
}