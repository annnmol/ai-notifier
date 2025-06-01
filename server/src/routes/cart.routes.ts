import { Router } from 'express';
import { handleAbandonedCart } from '../controllers/cart.controller';

const router = Router();

router.post('/abandoned', handleAbandonedCart);

export default router; 