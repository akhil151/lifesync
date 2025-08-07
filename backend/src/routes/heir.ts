import { Router } from 'express';

const router = Router();

// Placeholder routes
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Heir routes not implemented yet' });
});

export default router;
