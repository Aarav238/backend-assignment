import express from 'express';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

export default router;