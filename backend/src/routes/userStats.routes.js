import express from "express";
import { getUserStats } from "../controllers/userStats.controller.js";

const router = express.Router();

router.get("/:userId", getUserStats);

export default router;
