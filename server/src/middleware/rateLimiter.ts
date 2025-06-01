import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redisClient from '../db/redis';
import dotenv from 'dotenv';

dotenv.config();

// Initialize rate limiter after Redis is connected
let rateLimiter: RateLimiterRedis;

async function initRateLimiter() {
  if (!rateLimiter) {
    // Ensure Redis client is ready
    if (!redisClient.isReady) {
      await redisClient.connect();
    }
    
    rateLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      points: Number(process.env.RATE_LIMIT_POINTS) || 2, // Number of points
      duration: Number(process.env.RATE_LIMIT_DURATION) || 60, // Per 60 seconds
      blockDuration: 60 * 2, // Block for 2 minutes if consumed all points
      keyPrefix: 'rl' // Key prefix for rate limiter keys
    });
  }
  return rateLimiter;
}

export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const rateLimiter = await initRateLimiter();
    
    // Get user ID from header or fallback to IP
    const userId = req.headers['x-user-id'] as string;
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const key = userId || `ip:${ip}`;

    await rateLimiter.consume(key);
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(429).json({
        error: 'Too many requests. Please try again later.',
        retryAfter: error.message
      });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};