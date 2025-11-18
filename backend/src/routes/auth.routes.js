import express from 'express';
import { register, login, logout, sessionCheck } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/session', sessionCheck);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;