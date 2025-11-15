import express from 'express';
import { exportViewCSV, exportViewPDF } from '../controllers/exportViews.controller.js';

const router = express.Router();

// CSV: /api/export/views/:view/csv
// PDF: /api/export/views/:view/pdf
router.get('/views/:view/csv', exportViewCSV);
router.get('/views/:view/pdf', exportViewPDF);

export default router;