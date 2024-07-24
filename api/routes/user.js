import express from 'express';
import { test ,updateUser,deleteUser,getListing,getUser, getMyBooking } from '../Controllers/userController.js';
import { VerifyToken } from '../Utils/verifyUser.js';

const router = express.Router()

router.get('/test',test)
router.post('/update/:id',updateUser)
router.delete('/delete/:id',VerifyToken,deleteUser)
router.get('/listings/:id',VerifyToken,getListing)
router.get('/:id',VerifyToken,getUser)
router.get('/bookings/my-bookings', VerifyToken,getMyBooking)

export default router;