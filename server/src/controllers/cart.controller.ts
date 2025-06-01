import { Request, Response } from "express";
import { inngest } from "../agents/client";
export async function handleAbandonedCart(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = req.headers["x-user-id"] as string;
    const {
      cart,
      recipientContact,
      messageType = "whatsapp",
      userName = "Superhero",
      buyLink,
      language = "english",
    } = req.body;

    console.log("🛒 ENHANCED CART RECOVERY REQUEST:");
    console.log("├── User ID:", userId);
    console.log("├── Customer Name:", userName);
    console.log("├── Message Type:", messageType);
    console.log("├── Cart Value:", cart?.totalAmount);
    console.log("├── Items:", cart?.items?.length);
    console.log("└── Contact:", recipientContact);

    // Enhanced validation
    if (!userId || !cart || !recipientContact) {
      res.status(400).json({
        error: "Missing required fields: userId, cart, or recipientContact",
        details: {
          userId: !!userId,
          cart: !!cart,
          recipientContact: !!recipientContact,
        },
      });
      return;
    }

    // Validate message type
    if (!["email", "sms", "whatsapp"].includes(messageType)) {
      res.status(400).json({
        error: "Invalid messageType. Must be email, sms, or whatsapp",
      });
      return;
    }

    // Validate cart structure with enhanced checks
    if (
      !Array.isArray(cart.items) ||
      cart.items.length === 0 ||
      !cart.totalAmount ||
      cart.totalAmount <= 0
    ) {
      res.status(400).json({
        error:
          "Invalid cart structure - must have items and positive total amount",
        cart: cart,
      });
      return;
    }

    // Trigger Inngest workflow for 90-minute delayed notification
    const eventResult = await inngest.send({
      name: "cart/abandoned",
      data: {
        userId,
        userName,
        cart,
        recipientContact,
        messageType: messageType as "email" | "sms" | "whatsapp",
        buyLink,
        language,
        timestamp: new Date().toISOString(),
      },
    });

    console.log("📨 Inngest event triggered:", eventResult.ids);

    // Enhanced success response
    res.status(200).json({
      message: `90-minute abandoned cart workflow scheduled successfully`,
      details: {
        userId,
        messageType,
        workflowId: eventResult.ids,
        scheduledFor: new Date(Date.now() + 90 * 60 * 1000).toISOString(), // 90 minutes from now
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error("❌ Error in enhanced cart recovery:", error);
    res.status(500).json({
      error: "Failed to process abandoned cart notification",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}