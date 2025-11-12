import express from 'express';
import {
  getAllItems,
  getItemsByUser,
  addItem,
  updateItem,
  deleteItem
} from '../controllers/ewaste.controller.js';

const router = express.Router();

// Routes
router.get('/', getAllItems);
router.get('/:userId', getItemsByUser);
router.post('/', addItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;