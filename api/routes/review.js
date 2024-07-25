import express from 'express';
import { CreateReview,getalReviews ,getUserReviews} from '../Controllers/ReviewController.js';
import { VerifyToken } from '../Utils/verifyUser.js';
const router = express.Router()

router.post ('/reviews/:ListingId',VerifyToken,CreateReview)
router.get('/allreviews/:id', VerifyToken,getalReviews)
router.get('/my-reviews', VerifyToken,getUserReviews)
export default router