import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import session from "express-session";
import cors from "cors";
import db from './config/db.js';
import appRoutes from './src/app.js';

const app = express();

// 1. CORS
app.use(
  cors({
    origin: "http://localhost:5173",  // React frontend
    credentials: true                 // allow cookies
  })
);

// 2. Body Parser
app.use(express.json());

// 3. SESSION CONFIG
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,           // ✔️ false for localhost; true only with HTTPS
      sameSite: "lax",          // ✔️ required to allow cookies w/ local frontend
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

// 4. TEST DB
try {
  const connection = await db.getConnection();
  console.log("✅ Database connected successfully");
  connection.release();
} catch (err) {
  console.error("❌ Database connection failed:", err.message);
}

// 5. Load Existing App Routes
app.use("/api", appRoutes);

// 6. START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
