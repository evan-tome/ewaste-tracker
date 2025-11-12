// server.js
import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import db from './config/db.js'; // ✅ add this line

const PORT = process.env.PORT || 5000;

// Optional: test database connection before starting the server
try {
  const connection = await db.getConnection();
  console.log('✅ Database connected successfully');
  connection.release();
} catch (err) {
  console.error('❌ Database connection failed:', err.message);
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT} (${process.env.NODE_ENV})`);
});
