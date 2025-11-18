import db from '../../config/db.js';

// Get all centres with search & filters
export const getCentres = async (req, res) => {
  try {
    const { name, city } = req.query;

    let sql = `SELECT * FROM RecyclingCentres WHERE 1=1`;
    const params = [];

    // STARTSWITH name filter
    if (name) {
      sql += ` AND name LIKE ?`;
      params.push(`${name}%`);
    }

    // EXACT city filter
    if (city) {
      sql += ` AND city = ?`;
      params.push(city);
    }

    const [rows] = await db.query(sql, params);
    res.json(rows);

  } catch (err) {
    console.error('Error fetching centres:', err);
    res.status(500).json({ message: 'Server error fetching centres' });
  }
};

// Get single centre
export const getCentreById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM RecyclingCentres WHERE centre_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Centre not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching centre:', err);
    res.status(500).json({ message: 'Server error fetching centre' });
  }
};

// Add a new centre
export const addCentre = async (req, res) => {
  try {
    const { name, address, postal_code, phone } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const [result] = await db.query(
      'INSERT INTO RecyclingCentres (name, address, postal_code, phone) VALUES (?, ?, ?, ?)',
      [name, address, postal_code, phone]
    );

    res.status(201).json({ message: 'Centre added successfully', centre_id: result.insertId });
  } catch (err) {
    console.error('Error adding centre:', err);
    res.status(500).json({ message: 'Server error adding centre' });
  }
};

// Update centre
export const updateCentre = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, postal_code, phone } = req.body;

    const [result] = await db.query(
      'UPDATE RecyclingCentres SET name=?, address=?, postal_code=?, phone=? WHERE centre_id=?',
      [name, address, postal_code, phone, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Centre not found' });
    res.json({ message: 'Centre updated successfully' });
  } catch (err) {
    console.error('Error updating centre:', err);
    res.status(500).json({ message: 'Server error updating centre' });
  }
};

// Delete centre
export const deleteCentre = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM RecyclingCentres WHERE centre_id = ?', [id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Centre not found' });
    res.json({ message: 'Centre deleted successfully' });
  } catch (err) {
    console.error('Error deleting centre:', err);
    res.status(500).json({ message: 'Server error deleting centre' });
  }
};
