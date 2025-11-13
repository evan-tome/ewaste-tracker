import { getItemCarbonSaved } from '../services/carbon.service.js';

export const calculateItemFootprint = async (req, res) => {
  try {
    const { item_type, weight } = req.body;

    if (!item_type || !weight) {
      return res.status(400).json({ message: 'item_type and weight are required' });
    }

    const result = await getItemCarbonSaved(item_type, weight);

    if (!result || result.error) {
      return res.status(500).json({ message: 'Carbon Interface API error', details: result });
    }

    res.json({
      item_type,
      weight,
      carbon_estimate: result.data || result,
      message: 'Carbon footprint calculated successfully using Carbon Interface API'
    });
  } catch (err) {
    console.error('Error calculating carbon footprint:', err);
    res.status(500).json({ message: 'Server error calculating carbon footprint' });
  }
};
