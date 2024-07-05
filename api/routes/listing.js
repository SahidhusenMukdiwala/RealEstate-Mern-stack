import express from 'express';
import { createListing,DeleteListing,UpdateListing,GetListing,GetListings } from '../Controllers/ListingController.js';
import { VerifyToken } from '../Utils/verifyUser.js';
const router = express.Router()


router.post ('/create',VerifyToken,createListing)
router.delete('/delete/:id',VerifyToken,DeleteListing)
router.post('/update/:id',VerifyToken,UpdateListing)
router.get('/get/:id',GetListing)
router.get('/get',GetListings)

export default router;