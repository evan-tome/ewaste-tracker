import db from '../../config/db.js';

// Get all available rewards
export const getAllRewards = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Rewards ORDER BY points_required ASC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching rewards:', err);
    res.status(500).json({ message: 'Server error fetching rewards' });
  }
};

// Get user rewards (redeemed history)
export const getUserRewards = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await db.query(`
      SELECT ur.date_redeemed, r.reward_name, r.points_required, r.reward_type
      FROM UserRewards ur
      JOIN Rewards r ON ur.reward_id = r.reward_id
      WHERE ur.user_id = ?
      ORDER BY ur.date_redeemed DESC
    `, [userId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching user rewards:', err);
    res.status(500).json({ message: 'Server error fetching user rewards' });
  }
};

// Add new reward
export const addReward = async (req, res) => {
  try {
    const { reward_name, description, points_required, reward_type } = req.body;

    if (!reward_name || !points_required) {
      return res.status(400).json({ message: 'Reward name and points required are mandatory' });
    }

    const [result] = await db.query(`
      INSERT INTO Rewards (reward_name, description, points_required, reward_type)
      VALUES (?, ?, ?, ?)
    `, [reward_name, description, points_required, reward_type]);

    res.status(201).json({ message: 'Reward added successfully', reward_id: result.insertId });
  } catch (err) {
    console.error('Error adding reward:', err);
    res.status(500).json({ message: 'Server error adding reward' });
  }
};

// Redeem reward
export const redeemReward = async (req, res) => {
  try {
    const { user_id, reward_id } = req.body;

    if (!user_id || !reward_id) {
      return res.status(400).json({ message: 'User ID and Reward ID are required' });
    }

    // Check if user has enough points
    const [user] = await db.query('SELECT points FROM Users WHERE user_id = ?', [user_id]);
    const [reward] = await db.query('SELECT points_required FROM Rewards WHERE reward_id = ?', [reward_id]);

    if (user.length === 0 || reward.length === 0) {
      return res.status(404).json({ message: 'User or reward not found' });
    }

    if (user[0].points < reward[0].points_required) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    // Deduct points and record redemption
    await db.query('UPDATE Users SET points = points - ? WHERE user_id = ?', [reward[0].points_required, user_id]);
    await db.query(`
      INSERT INTO UserRewards (user_id, reward_id, date_redeemed)
      VALUES (?, ?, NOW())
    `, [user_id, reward_id]);

    res.json({ message: 'Reward redeemed successfully' });
  } catch (err) {
    console.error('Error redeeming reward:', err);
    res.status(500).json({ message: 'Server error redeeming reward' });
  }
};

// Delete a reward
export const deleteReward = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM Rewards WHERE reward_id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Reward not found' });
    res.json({ message: 'Reward deleted successfully' });
  } catch (err) {
    console.error('Error deleting reward:', err);
    res.status(500).json({ message: 'Server error deleting reward' });
  }
};
