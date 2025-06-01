// Notification service - handles message delivery only
import { sendSMS, sendWhatsApp } from './sms.service';
import { generateAbandonedCartMessage } from './ai.service';
import { sendEmail, createAbandonedCartEmailHTML } from './email.service';
import { NotificationPayload } from '../models/types';
import dotenv from 'dotenv';

dotenv.config();

// Main notification sending function
export async function sendNotification(payload: NotificationPayload): Promise<void> {
  const startTime = Date.now();
  const messageId = `${payload.messageType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  console.log('📨 NOTIFICATION REQUEST:');
  console.log('├── Message ID:', messageId);
  console.log('├── Type:', payload.messageType.toUpperCase());
  console.log('├── Cart Value:', `$${payload.cart.totalAmount}`);
  console.log('├── Items:', payload.cart.items.length);
  console.log('├── Customer:', payload.userName || 'Anonymous');
  console.log('└── Contact:', payload.recipientContact);
  
  try {
    // Generate AI message
    console.log('🤖 Generating AI message...');
    const message = await generateAbandonedCartMessage(
      payload.cart, 
      payload.userName, 
      payload.buyLink,
      payload.language,
      payload.messageType,
    );
    
    console.log('\n📝 GENERATED MESSAGE:');
    console.log(message);
    console.log('\n' + '='.repeat(50));
        
    if (payload.messageType === 'email') {
      console.log('📧 SENDING EMAIL...');
      console.log('├── To:', payload.recipientContact);
      console.log('├── Subject: ⚡ Your curated selection is waiting...');
      console.log('└── Message ID:', messageId);
      
      const subject = '🛒 Your Cart is Waiting - Complete Your Purchase!';
      const htmlContent = createAbandonedCartEmailHTML(
        payload.userName || 'Valued Customer',
        message,
        payload.cart.items,
        payload.cart.totalAmount
      );
      
      await sendEmail(payload.recipientContact, subject, message, htmlContent);
      console.log('✅ Email sent successfully');
      
    } else if (payload.messageType === 'sms') {
      console.log('📱 SENDING SMS...');
      console.log('├── To:', payload.recipientContact);
      console.log('└── Message ID:', messageId);
      
      await sendSMS(payload.recipientContact, message);
      console.log('✅ SMS delivered successfully');
      
    } else if (payload.messageType === 'whatsapp') {
      console.log('💬 SENDING WHATSAPP...');
      console.log('├── To:', payload.recipientContact);
      console.log('└── Message ID:', messageId);
      
      await sendWhatsApp(payload.recipientContact, message);
      console.log('✅ WhatsApp delivered successfully');
      
    } else {
      throw new Error(`Unsupported message type: ${payload.messageType}`);
    }
        
  } catch (error) {
    console.error(`❌ Notification ${messageId} failed:`, error);
    throw error;
  }
}