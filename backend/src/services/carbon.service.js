import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'https://www.carboninterface.com/api/v1';

export async function getItemCarbonSaved(itemType, weightKg) {
  try {
    // Map item types to realistic emission sources
    const categoryMap = {
      aluminum: 'recycling_aluminum',
      plastic: 'recycling_plastic',
      glass: 'recycling_glass',
      steel: 'recycling_steel',
      ewaste: 'recycling_electronics',
      copper: 'recycling_metal',
      paper: 'recycling_paper'
    };

    const category = categoryMap[itemType.toLowerCase()] || categoryMap.ewaste;

    const response = await fetch(`${BASE_URL}/estimates`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CARBON_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'electricity', // Carbon Interface requires a valid type; recycling-specific categories aren’t natively supported, so we simulate weight-based calculations
        electricity_unit: 'kg',
        electricity_value: weightKg,
        country: 'us'
      })
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Carbon API Error:', err);
    throw new Error('Failed to calculate carbon footprint');
  }
}
