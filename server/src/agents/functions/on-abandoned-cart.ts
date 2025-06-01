import { inngest } from "../client";
import { sendNotification } from "../../services/notification.service";
import { Cart, NotificationPayload } from "../../models/types";

export const onAbandonedCart = inngest.createFunction(
  {
    id: "abandoned-cart-recovery",
    name: "90-Minute Abandoned Cart Recovery",
    retries: 1,
  },
  { event: "cart/abandoned" },
  async ({ event, step }) => {
    try {
      const {
        userId,
        userName,
        cart,
        recipientContact,
        messageType,
        buyLink,
        language,
        timestamp,
      } = event.data;

      console.log("🛒 ABANDONED CART WORKFLOW STARTED:");
      console.log("├── event data:", event.data);

      // Step 1: Wait for 90 minutes before sending notification
         await step.sleep("wait-90-minutes", "90m");
      // await step.sleep("wait-90-minutes", "1 mins");

      // Step 2: Check if user completed purchase (this would cancel the workflow)
      const purchaseCheck = await step.run(
        "check-purchase-status",
        async () => {
          // In a real implementation, you'd check your database
          console.log("🔍 Checking if user completed purchase...");
          return { purchased: false, cartStillActive: true };
        }
      );

      if (purchaseCheck.purchased) {
        console.log("✅ User completed purchase, cancelling notification");
        return {
          success: true,
          message: "Cart was purchased, notification cancelled",
          action: "cancelled",
        };
      }

      // Step 3: Generate and send notification
      const notificationResult = await step.run(
        "send-notification",
        async () => {
          try {
            const payload: NotificationPayload = {
              userId,
              userName: userName || "Superman",
              cart: cart as Cart,
              messageType: messageType as "email" | "sms" | "whatsapp",
              recipientContact,
              buyLink,
              language: language || "hindi",
            };

            await sendNotification(payload);

            console.log("📱 Notification sent successfully");

            return {
              success: true,
              messageType,
              recipient: recipientContact,
            };
          } catch (error) {
            console.error("❌ Notification failed:", error);
            throw error;
          }
        }
      );

      return {
        success: true,
        notificationSent: true,
        notificationDetails: notificationResult,
        workflowCompletedAt: new Date().toISOString(),
      };
    } catch (err) {
      console.error("❌ Error in abandoned cart workflow:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
        timestamp: new Date().toISOString(),
      };
    }
  }
);
