import db from '../../config/db.js';

// Get all recycled items
export const getAllItems = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.item_id, u.username, c.name AS centre_name,
             r.item_type, r.quantity, r.weight, r.date_logged
      FROM RecycledItems r
      JOIN Users u ON r.user_id = u.user_id
      JOIN RecyclingCentres c ON r.centre_id = c.centre_id
      ORDER BY r.date_logged DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching recycled items:', err);
    res.status(500).json({ message: 'Server error fetching recycled items' });
  }
};

// Get all items for a specific user
export const getItemsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await db.query(`
      SELECT r.item_id, c.name AS centre_name,
             r.item_type, r.quantity, r.weight, r.date_logged
      FROM RecycledItems r
      JOIN RecyclingCentres c ON r.centre_id = c.centre_id
      WHERE r.user_id = ?
      ORDER BY r.date_logged DESC
    `, [userId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching user recycled items:', err);
    res.status(500).json({ message: 'Server error fetching user recycled items' });
  }
};

// Add a new recycled item
export const addItem = async (req, res) => {
  try {
    const { user_id, centre_id, item_type, quantity, weight } = req.body;

    if (!user_id || !centre_id || !item_type || !quantity || !weight) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const [result] = await db.query(`
      INSERT INTO RecycledItems (user_id, centre_id, item_type, quantity, weight, date_logged)
      VALUES (?, ?, ?, ?, ?, CURDATE())
    `, [user_id, centre_id, item_type, quantity, weight]);

    res.status(201).json({ message: 'Recycled item logged successfully', item_id: result.insertId });
  } catch (err) {
    console.error('Error adding recycled item:', err);
    res.status(500).json({ message: 'Server error adding recycled item' });
  }
};

// Update a recycled item
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { item_type, quantity, weight } = req.body;

    const [result] = await db.query(`
      UPDATE RecycledItems
      SET item_type = ?, quantity = ?, weight = ?
      WHERE item_id = ?
    `, [item_type, quantity, weight, id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Recycled item updated successfully' });
  } catch (err) {
    console.error('Error updating recycled item:', err);
    res.status(500).json({ message: 'Server error updating recycled item' });
  }
};

// Delete a recycled item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM RecycledItems WHERE item_id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Recycled item deleted successfully' });
  } catch (err) {
    console.error('Error deleting recycled item:', err);
    res.status(500).json({ message: 'Server error deleting recycled item' });
  }
};
