import { Router } from 'express';

const router = Router();

// Placeholder routes
router.get('/profile', (req, res) => {
  res.status(501).json({ message: 'User routes not implemented yet' });
});

export default router;
