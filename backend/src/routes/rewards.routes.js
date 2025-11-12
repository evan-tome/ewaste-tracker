import express from 'express';
import {
  getAllRewards,
  getUserRewards,
  addReward,
  redeemReward,
  deleteReward
} from '../controllers/rewards.controller.js';

const router = express.Router();

// Routes
router.get('/', getAllRewards);
router.get('/user/:userId', getUserRewards);
router.post('/', addReward);
router.post('/redeem', redeemReward);
router.delete('/:id', deleteReward);

export default router;
