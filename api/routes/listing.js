import express from 'express';
import { createListing,DeleteListing,UpdateListing,GetListing } from '../Controllers/ListingController.js';
import { VerifyToken } from '../Utils/verifyUser.js';
const router = express.Router()


router.post ('/create',VerifyToken,createListing)
router.delete('/delete/:id',VerifyToken,DeleteListing)
router.post('/update/:id',VerifyToken,UpdateListing)
router.get('/get/:id',GetListing)

export default router;