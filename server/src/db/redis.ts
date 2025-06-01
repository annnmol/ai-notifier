import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

console.log('Connecting to Redis at:', process.env.REDIS_URL);

// Parse Redis URL for manual configuration
const redisUrl = new URL(process.env.REDIS_URL || 'redis://localhost:6379');
const isSSL = redisUrl.protocol === 'rediss:';

const redisClient = createClient({
  socket: {
    host: redisUrl.hostname,
    port: parseInt(redisUrl.port) || 6379,
    // Disable TLS temporarily to test connection
    // tls: isSSL,
    // rejectUnauthorized: false,
  },
  username: redisUrl.username || 'default',
  password: redisUrl.password || '',
});

redisClient.on('error', (err: unknown) => console.error('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

// Connect to Redis
redisClient.connect().catch(console.error);

export default redisClient;
