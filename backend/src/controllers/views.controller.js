import db from '../../config/db.js';

export const getItemsShipped = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM items_shipped_to_centres');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching items_shipped_to_centres:', err);
    res.status(500).json({ message: 'Server error fetching items shipped to centres' });
  }
};

export const getMostPopularCentres = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM most_popular_centres');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching most_popular_centres:', err);
    res.status(500).json({ message: 'Server error fetching most popular centres' });
  }
};

export const getAverageItemQuantity = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM average_item_quantity');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching average_item_quantity:', err);
    res.status(500).json({ message: 'Server error fetching average item quantity' });
  }
};

export const getAllCentres = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM all_centres');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching all_centres:', err);
    res.status(500).json({ message: 'Server error fetching all centres' });
  }
};

export const getPopularCentresInCanada = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM popular_centres_in_canada');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching popular_centres_in_canada:', err);
    res.status(500).json({ message: 'Server error fetching popular centres in Canada' });
  }
};

export const getActiveUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM active_users');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching active_users:', err);
    res.status(500).json({ message: 'Server error fetching active users' });
  }
};

export const getRedeemedRewards = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM redeemed_rewards');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching redeemed_rewards:', err);
    res.status(500).json({ message: 'Server error fetching redeemed rewards' });
  }
};

export const getPrestigiousAwards = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM prestigious_awards');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching prestigious_awards:', err);
    res.status(500).json({ message: 'Server error fetching prestigious awards' });
  }
};

export const getCompletedPickups = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM completed_pickups');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching completed_pickups:', err);
    res.status(500).json({ message: 'Server error fetching completed pickups' });
  }
};

export const getPendingPickups = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pending_pickups');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching pending_pickups:', err);
    res.status(500).json({ message: 'Server error fetching pending pickups' });
  }
};
