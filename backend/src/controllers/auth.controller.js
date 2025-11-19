import bcrypt from 'bcrypt';
import db from '../../config/db.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email and password are required' });
    }

    // Check if user exists
    const [existing] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.query(
      'INSERT INTO Users (username, email, password_hash, date_joined) VALUES (?, ?, ?, CURDATE())',
      [username, email, hashedPassword]
    );

    // Store session
    req.session.user = { id: result.insertId, username, email };

    res.status(201).json({ message: 'Registration successful', user: req.session.user });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Look up user
    const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Store session
    req.session.user = { 
      id: user.user_id,
      username: user.username,
      email: user.email,
      role: user.role,
      date_joined: user.date_joined,
      points: user.points
    };

    res.json({ message: 'Login successful', user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const logout = (req, res) => {
  if (!req.session.user) {
    return res.status(400).json({ message: 'No active session' });
  }

  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error logging out' });
    }

    res.clearCookie('connect.sid'); // clears session cookie
    res.json({ message: 'Logged out successfully' });
  });
};

export const sessionCheck = (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(200).json({ loggedIn: false, user: null });
    }

    return res.status(200).json({
      loggedIn: true,
      user: req.session.user
    });

  } catch (err) {
    console.error("Session check error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

