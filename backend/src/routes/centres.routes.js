import express from 'express';
import {
  getCentres,
  getCentreById,
  addCentre,
  updateCentre,
  deleteCentre
} from '../controllers/centres.controller.js';

const router = express.Router();

// Routes
router.get('/', getCentres);
router.get('/:id', getCentreById);
router.post('/', addCentre);
router.put('/:id', updateCentre);
router.delete('/:id', deleteCentre);

export default router;
