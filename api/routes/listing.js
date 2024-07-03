import express from 'express';
import { createListing } from '../Controllers/ListingController.js';
import { VerifyToken } from '../Utils/verifyUser.js';
const router = express.Router()


router.post ('/create',VerifyToken,createListing)


export default router;