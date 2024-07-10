import express from 'express';
import { CreateReview } from '../Controllers/ReviewController.js';
import { VerifyToken } from '../Utils/verifyUser.js';
const router = express.Router()

router.post ('/reviews/:ListingId',VerifyToken,CreateReview)

export default router