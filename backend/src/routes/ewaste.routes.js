import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { getAllItems, createItem } from '../controllers/ewaste.controller.js';

const router = express.Router();

router.get('/', auth, getAllItems);
router.post('/', auth, createItem);

export default router;
