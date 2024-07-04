import express from 'express';
import { test ,updateUser,deleteUser,getListing } from '../Controllers/Usercontroller.js';
import { VerifyToken } from '../Utils/verifyUser.js';

const router = express.Router()

router.get('/test',test)
router.post('/update/:id',updateUser)
router.delete('/delete/:id',VerifyToken,deleteUser)
router.get('/listings/:id',VerifyToken,getListing)

export default router;