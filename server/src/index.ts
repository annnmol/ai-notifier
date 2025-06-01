import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";
import { rateLimiterMiddleware } from "./middleware/rateLimiter";
import { incomingRequestLogging } from "./lib/utils";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "x-user-id",
    ],
  })
);

/** Log the incoming request */
app.use(incomingRequestLogging);

// Health check endpoint (unprotected)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Public routes - no middleware
app.use("/api/auth", authRoutes);

// Apply middleware to all routes
// app.use(rateLimiterMiddleware);  // Temporarily disabled due to Redis Lua script issues

// Protected routes
app.use("/api/cart", cartRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
