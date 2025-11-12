import express from 'express';
import requireAuth from '../middleware/auth.middleware.js';
import { getAllItems, createItem } from '../controllers/ewaste.controller.js';

const router = express.Router();

// Only logged-in users can access these
router.get('/', requireAuth, getAllItems);
router.post('/', requireAuth, createItem);

export default router;
