import pool from '../../config/db.js';

export const getAllItems = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query('SELECT * FROM RecycledItems WHERE user_id = ?', [userId]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const createItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { centre_id, item_type, quantity, weight } = req.body;
    if (!centre_id || !item_type) return res.status(400).json({ message: 'centre_id and item_type required' });

    const [result] = await pool.query(
      `INSERT INTO RecycledItems (user_id, centre_id, item_type, quantity, weight, date_logged)
       VALUES (?, ?, ?, ?, ?, CURDATE())`,
      [userId, centre_id, item_type, quantity || 1, weight || null]
    );

    res.status(201).json({ message: 'Item logged', item_id: result.insertId });
  } catch (err) {
    next(err);
  }
};
