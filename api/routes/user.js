import express from 'express';
import { test ,updateUser,deleteUser } from '../Controllers/Usercontroller.js';
import { VerifyToken } from '../Utils/verifyUser.js';

const router = express.Router()

router.get('/test',test)
router.put('/update/:id',VerifyToken,updateUser)
router.delete('/delete/:id',VerifyToken,deleteUser)

export default router;