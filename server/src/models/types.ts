export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  totalAmount: number;
  lastUpdated: Date;
}

export interface NotificationPayload {
  userId: string;
  userName?: string; // Optional user name for personalization
  cart: Cart;
  messageType: 'email' | 'sms' | 'whatsapp';
  recipientContact: string;
  buyLink?: string; // Optional buy link for completing purchase
  language?: string; // Optional language preference (e.g., 'hindi', 'english')
}