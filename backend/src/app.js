// src/app.js
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import ewasteRoutes from './routes/ewaste.routes.js';
import centresRoutes from './routes/centres.routes.js';
import pickupsRoutes from './routes/pickups.routes.js';
import rewardsRoutes from './routes/rewards.routes.js';
import errorHandler from './middleware/error.middleware.js';
import viewsRoutes from './routes/views.routes.js';
import carbonRoutes from './routes/carbon.routes.js';
import mapsRoutes from './routes/maps.routes.js';

dotenv.config();

const app = express();

// Security and JSON parsing
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (allow frontend to send cookies)
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ewaste', ewasteRoutes);
app.use('/api/centres', centresRoutes);
app.use('/api/pickups', pickupsRoutes);
app.use('/api/rewards', rewardsRoutes);
app.use('/api/views', viewsRoutes);
app.use('/api/carbon', carbonRoutes);
app.use('/api/maps', mapsRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Centralized error handler
app.use(errorHandler);

export default app;
