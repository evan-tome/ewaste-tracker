import pool from '../../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SALT_ROUNDS = 10;

export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    // check if email exists
    const [existing] = await pool.query('SELECT user_id FROM Users WHERE email = ?', [email]);
    if (existing.length) return res.status(409).json({ message: 'Email already registered' });

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const [result] = await pool.query(
      'INSERT INTO Users (username, email, password_hash, role, date_joined, points) VALUES (?, ?, ?, ?, CURDATE(), ?)',
      [username, email, password_hash, 'user', 0]
    );

    const userId = result.insertId;
    const token = jwt.sign({ id: userId, email, role: 'user' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(201).json({ token, user: { id: userId, username, email } });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const [rows] = await pool.query('SELECT user_id, username, password_hash, role FROM Users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.user_id, email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token, user: { id: user.user_id, username: user.username, email } });
  } catch (err) {
    next(err);
  }
}