import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
  port: Number(process.env.SMTP_PORT) || 2525, // Use port 2525 for Mailtrap
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter connection
transporter.verify((error) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

export async function sendEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP credentials not configured');
  }

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
    ...(html && { html })
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

export function createAbandonedCartEmailHTML(
  customerName: string,
  message: string,
  cartItems: Array<{name: string, price: number, quantity: number}>,
  cartTotal: number
): string {
  const itemsHTML = cartItems.map(item => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 15px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <strong>${item.name}</strong><br>
        <span style="color: #666; font-size: 14px;">Qty: ${item.quantity}</span>
      </td>
      <td style="padding: 15px; text-align: right; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; color: #2c5282;">
        $${item.price.toFixed(2)}
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Cart is Waiting!</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f7fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🛒 Your Cart Awaits!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Don't let these amazing items slip away</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 30px;">
          <h2 style="color: #2d3748; margin: 0 0 20px 0; font-size: 24px;">Hi ${customerName}! 👋</h2>
          
          <div style="background-color: #edf2f7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4299e1;">
            <p style="margin: 0; color: #2d3748; font-size: 16px; line-height: 1.6;">${message}</p>
          </div>

          <!-- Cart Items -->
          <div style="margin: 30px 0;">
            <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Your Selected Items:</h3>
            <table style="width: 100%; border-collapse: collapse; background-color: white; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
              ${itemsHTML}
              <tr style="background-color: #f7fafc;">
                <td style="padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; font-size: 18px; color: #2d3748;">
                  Total:
                </td>
                <td style="padding: 20px; text-align: right; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; font-size: 20px; color: #38a169;">
                  $${cartTotal.toFixed(2)}
                </td>
              </tr>
            </table>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #48bb78, #38a169); color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4); transition: all 0.3s ease;">
              Complete Your Purchase 🚀
            </a>
          </div>

          <!-- Trust Signals -->
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <div style="text-align: center;">
              <p style="margin: 0; color: #4a5568; font-size: 14px;">
                🔒 Secure Checkout • 📦 Free Shipping • 💯 Money-Back Guarantee
              </p>
            </div>
          </div>

          <!-- Urgency Note -->
          <div style="background-color: #fed7d7; border: 1px solid #fc8181; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #c53030; font-size: 14px; text-align: center;">
              ⏰ <strong>Limited Time:</strong> These items are popular and stock may be limited!
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #2d3748; padding: 20px; text-align: center;">
          <p style="margin: 0; color: #a0aec0; font-size: 14px;">
            Questions? Reply to this email or contact our support team.<br>
            © 2024 Event Notifier. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}