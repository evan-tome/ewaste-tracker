import { findRecyclingCentres } from '../services/maps.service.js';
import db from '../../config/db.js';

export async function searchCentres(req, res) {
  try {
    const { keyword = 'e-waste recycling centre', location, radius } = req.query;

    if (!location) {
      return res.status(400).json({ message: 'location query param required' });
    }

    const results = await findRecyclingCentres(keyword, location, radius);

    // Save only name, address, postal_code
    const savePromises = results.map(async (centre) => {
        const name = centre.name || null;
        const address = centre.formatted_address || null;
        const phone = centre.phone || null;

        let postal_code = null;
        if (address) {
            const match = address.match(/[A-Z]\d[A-Z][ -]?\d[A-Z]\d/i);
            postal_code = match ? match[0].toUpperCase() : null;
        }

        await db.query(
            `INSERT IGNORE INTO RecyclingCentres (name, address, postal_code, phone)
            VALUES (?, ?, ?, ?)`,
            [name, address, postal_code, phone]
        );
    });

    await Promise.all(savePromises);

    res.json({
      count: results.length,
      centres: results
    });
  } catch (err) {
    console.error('Error searching centres:', err);
    res.status(500).json({ message: 'Server error searching centres' });
  }
}
