import express from 'express';
import { CreateBooking } from '../Controllers/BookingController.js';
import { VerifyToken } from '../Utils/verifyUser.js';

const router = express.Router();

router.post('/checkout-success/:listingId',VerifyToken,CreateBooking)

export default router;