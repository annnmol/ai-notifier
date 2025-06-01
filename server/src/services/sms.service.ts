import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
  console.warn('Twilio credentials not configured. SMS/WhatsApp features will be unavailable.');
}


const client = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export async function sendSMS(to: string, message: string): Promise<void> {
  if (!client || !process.env.TWILIO_PHONE_NUMBER) {
    throw new Error('Twilio SMS not configured');
  }

  await client.messages.create({
    body: message?.slice(0, 120), // because trail sandbox has lower limits
    to,
    from: process.env.TWILIO_PHONE_NUMBER,
  });
}

export async function sendWhatsApp(to: string, message: string): Promise<void> {
  if (!client || !process.env.TWILIO_WHATSAPP_NUMBER) {
    throw new Error('Twilio WhatsApp not configured');
  }

  await client.messages.create({
    body: message,
    to: `whatsapp:${to}`,
    from: process.env.TWILIO_WHATSAPP_NUMBER, // Already includes whatsapp: prefix
  });
} 