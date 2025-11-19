// src/app.js
import express from 'express';

import authRoutes from './routes/auth.routes.js';
import ewasteRoutes from './routes/ewaste.routes.js';
import centresRoutes from './routes/centres.routes.js';
import pickupsRoutes from './routes/pickups.routes.js';
import rewardsRoutes from './routes/rewards.routes.js';
import viewsRoutes from './routes/views.routes.js';
import mapsRoutes from './routes/maps.routes.js';
import exportViewsRoutes from './routes/exportViews.routes.js';
import userStatsRoutes from "./routes/userStats.routes.js";

import errorHandler from './middleware/error.middleware.js';

const router = express.Router();

// Routes
router.use('/auth', authRoutes);
router.use('/ewaste', ewasteRoutes);
router.use('/centres', centresRoutes);
router.use('/pickups', pickupsRoutes);
router.use('/rewards', rewardsRoutes);
router.use('/views', viewsRoutes);
router.use('/maps', mapsRoutes);
router.use('/export', exportViewsRoutes);
router.use("/user", userStatsRoutes);

// Health check
router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Error handler
router.use(errorHandler);

export default router;
