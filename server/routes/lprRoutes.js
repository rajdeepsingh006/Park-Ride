import express from 'express';
import { checkInByLPR, checkOutByRFID } from '../controllers/lprController.js';
const router = express.Router();

router.post('/lpr/checkin', checkInByLPR);
router.post('/rfid/checkout', checkOutByRFID);

export default router;
