import { Request, Response } from 'express';
import { Cart, NotificationPayload } from '../models/types';
import { sendNotification } from '../services/notification.service';

export async function handleAbandonedCart(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.headers['x-user-id'] as string;
    const { 
      cart, 
      recipientContact, 
      messageType = 'whatsapp', // Default to WhatsApp for better engagement
      userName = 'Superhero',
      buyLink,
      language = 'english' // Default language
    } = req.body;

    console.log('🛒 ENHANCED CART RECOVERY REQUEST:');
    console.log('├── User ID:', userId);
    console.log('├── Customer Name:', userName);
    console.log('├── Message Type:', messageType);
    console.log('├── Cart Value:', cart?.totalAmount);
    console.log('├── Items:', cart?.items?.length);
    console.log('└── Contact:', recipientContact);

    // Enhanced validation
    if (!userId || !cart || !recipientContact) {
      res.status(400).json({ 
        error: 'Missing required fields: userId, cart, or recipientContact',
        details: { userId: !!userId, cart: !!cart, recipientContact: !!recipientContact }
      });
      return;
    }

    // Validate message type
    if (!['email', 'sms', 'whatsapp'].includes(messageType)) {
      res.status(400).json({ 
        error: 'Invalid messageType. Must be email, sms, or whatsapp' 
      });
      return;
    }

    // Validate cart structure with enhanced checks
    if (!Array.isArray(cart.items) || cart.items.length === 0 || !cart.totalAmount || cart.totalAmount <= 0) {
      res.status(400).json({ 
        error: 'Invalid cart structure - must have items and positive total amount',
        cart: cart
      });
      return;
    }

    const notificationPayload: NotificationPayload = {
      userId,
      userName,
      cart: cart as Cart,
      messageType: messageType as 'email' | 'sms' | 'whatsapp',
      recipientContact,
      buyLink,
      language
    };

    // Send notification with enhanced AI messaging
    await sendNotification(notificationPayload);

    // Enhanced success response
    res.status(200).json({ 
      message: `Enhanced abandoned cart ${messageType} notification sent successfully`,
      details: {
        userId,
        cartValue: cart.totalAmount,
        itemCount: cart.items.length,
        messageType,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('❌ Error in enhanced cart recovery:', error);
    res.status(500).json({ 
      error: 'Failed to process abandoned cart notification',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 