import express from 'express';
import { calculateItemFootprint } from '../controllers/carbon.controller.js';

const router = express.Router();

router.post('/item', calculateItemFootprint);

export default router;