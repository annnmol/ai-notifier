import { Router, Request, Response } from 'express';

const router = Router();

// Public endpoint - no middleware checks
router.get('/', (_req: Request, res: Response) => {
  res.json({ 
    message: 'Auth endpoint placeholder',
    status: 'public_access'
  });
});

export default router; 