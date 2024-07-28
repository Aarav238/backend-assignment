import express from 'express';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

export default router;