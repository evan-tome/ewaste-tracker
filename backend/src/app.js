// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.routes.js';
import ewasteRoutes from './routes/ewaste.routes.js';
import centresRoutes from './routes/centres.routes.js';
import pickupsRoutes from './routes/pickups.routes.js';
import rewardsRoutes from './routes/rewards.routes.js';

import errorHandler from './middleware/error.middleware.js';

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/ewaste', ewasteRoutes);
app.use('/api/centres', centresRoutes);
app.use('/api/pickups', pickupsRoutes);
app.use('/api/rewards', rewardsRoutes);

// health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// centralized error handler
app.use(errorHandler);

export default app;
