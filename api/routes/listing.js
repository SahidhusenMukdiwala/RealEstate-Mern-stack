import express from 'express';
import { createListing,DeleteListing } from '../Controllers/ListingController.js';
import { VerifyToken } from '../Utils/verifyUser.js';
const router = express.Router()


router.post ('/create',VerifyToken,createListing)
router.delete('/delete/:id',VerifyToken,DeleteListing)


export default router;