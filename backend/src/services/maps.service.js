// src/services/maps.service.js
import { Client } from '@googlemaps/google-maps-services-js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({});

export async function findRecyclingCentres(keyword, location, radius = 5000) {
  const [lat, lng] = location.split(',').map(Number);

  const response = await client.textSearch({
    params: {
      key: process.env.GOOGLE_MAPS_API_KEY,
      query: keyword,
      location: { lat, lng },
      radius,
    },
  });

  const places = response.data.results;

  // Fetch phone numbers using Place Details API
  const enriched = await Promise.all(
    places.map(async (p) => {
      try {
        const detail = await client.placeDetails({
          params: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            place_id: p.place_id,
            fields: ['formatted_phone_number']
          }
        });

        return {
          ...p,
          phone: detail.data?.result?.formatted_phone_number || null,
        };
      } catch (err) {
        console.error("Details fetch failed for", p.place_id);
        return { ...p, phone: null };
      }
    })
  );

  return enriched;
}
