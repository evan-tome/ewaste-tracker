import express from 'express';
import {
  getAllPickups,
  getPickupsByUser,
  addPickupRequest,
  updatePickupStatus,
  deletePickup
} from '../controllers/pickups.controller.js';

const router = express.Router();

// Routes
router.get('/', getAllPickups);
router.get('/:userId', getPickupsByUser);
router.post('/', addPickupRequest);
router.put('/:id', updatePickupStatus);
router.delete('/:id', deletePickup);

export default router;
