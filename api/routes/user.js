import express from 'express';
import { test ,updateUser } from '../Controllers/Usercontroller.js';
import { VerifyToken } from '../Utils/verifyUser.js';

const router = express.Router()

router.get('/test',test)
router.post('/update/:id',VerifyToken,updateUser)

export default router;