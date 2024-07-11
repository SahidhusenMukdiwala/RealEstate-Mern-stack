import express from 'express';
import { CreateReview,getalReviews } from '../Controllers/ReviewController.js';
import { VerifyToken } from '../Utils/verifyUser.js';
const router = express.Router()

router.post ('/reviews/:ListingId',VerifyToken,CreateReview)
router.get('/allreviews', VerifyToken,getalReviews)
export default router