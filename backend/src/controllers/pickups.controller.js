import db from '../../config/db.js';

// Get all pickup requests
export const getAllPickups = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.request_id, u.username, c.name AS centre_name,
             p.request_date, p.status
      FROM PickupRequests p
      JOIN Users u ON p.user_id = u.user_id
      JOIN RecyclingCentres c ON p.centre_id = c.centre_id
      ORDER BY p.request_date DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching pickup requests:', err);
    res.status(500).json({ message: 'Server error fetching pickup requests' });
  }
};

// Get all pickups for a specific user
export const getPickupsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await db.query(`
      SELECT p.request_id, c.name AS centre_name, p.request_date, p.status
      FROM PickupRequests p
      JOIN RecyclingCentres c ON p.centre_id = c.centre_id
      WHERE p.user_id = ?
      ORDER BY p.request_date DESC
    `, [userId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching user pickups:', err);
    res.status(500).json({ message: 'Server error fetching user pickups' });
  }
};

// Add a new pickup request
export const addPickupRequest = async (req, res) => {
  try {
    const { user_id, centre_id } = req.body;

    if (!user_id || !centre_id) {
      return res.status(400).json({ message: 'User ID and Centre ID are required' });
    }

    const [result] = await db.query(`
      INSERT INTO PickupRequests (user_id, centre_id, request_date, status)
      VALUES (?, ?, NOW(), 'Requested')
    `, [user_id, centre_id]);

    res.status(201).json({ message: 'Pickup request created successfully', request_id: result.insertId });
  } catch (err) {
    console.error('Error adding pickup request:', err);
    res.status(500).json({ message: 'Server error adding pickup request' });
  }
};

// Update pickup status
export const updatePickupStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Requested', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const [result] = await db.query(`
      UPDATE PickupRequests
      SET status = ?
      WHERE request_id = ?
    `, [status, id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Pickup request not found' });
    res.json({ message: 'Pickup status updated successfully' });
  } catch (err) {
    console.error('Error updating pickup status:', err);
    res.status(500).json({ message: 'Server error updating pickup status' });
  }
};

// Delete a pickup request
export const deletePickup = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM PickupRequests WHERE request_id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Pickup request not found' });
    res.json({ message: 'Pickup request deleted successfully' });
  } catch (err) {
    console.error('Error deleting pickup request:', err);
    res.status(500).json({ message: 'Server error deleting pickup request' });
  }
};
