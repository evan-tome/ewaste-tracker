import express from 'express';
import {
  getItemsShipped,
  getMostPopularCentres,
  getAverageItemQuantity,
  getAllCentres,
  getPopularCentresInCanada,
  getActiveUsers,
  getRedeemedRewards,
  getPrestigiousAwards,
  getCompletedPickups,
  getPendingPickups,
  getLeaderboard
} from '../controllers/views.controller.js';

const router = express.Router();

router.get('/items_shipped', getItemsShipped);
router.get('/most_popular', getMostPopularCentres);
router.get('/average_quantity', getAverageItemQuantity);
router.get('/all_centres', getAllCentres);
router.get('/popular_canada', getPopularCentresInCanada);
router.get('/active_users', getActiveUsers);
router.get('/redeemed_rewards', getRedeemedRewards);
router.get('/prestigious_awards', getPrestigiousAwards);
router.get('/completed_pickups', getCompletedPickups);
router.get('/pending_pickups', getPendingPickups);
router.get('/leaderboard', getLeaderboard);

export default router;
