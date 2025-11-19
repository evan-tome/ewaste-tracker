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

router.get('/items-shipped', getItemsShipped);
router.get('/most-popular', getMostPopularCentres);
router.get('/average-quantity', getAverageItemQuantity);
router.get('/all-centres', getAllCentres);
router.get('/popular-canada', getPopularCentresInCanada);
router.get('/active-users', getActiveUsers);
router.get('/redeemed-rewards', getRedeemedRewards);
router.get('/prestigious-awards', getPrestigiousAwards);
router.get('/completed-pickups', getCompletedPickups);
router.get('/pending-pickups', getPendingPickups);
router.get('/leaderboard', getLeaderboard);

export default router;
