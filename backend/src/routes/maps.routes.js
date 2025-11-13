import express from 'express';
import { searchCentres } from '../controllers/maps.controller.js';

const router = express.Router();
router.get('/centres', searchCentres);

export default router;
