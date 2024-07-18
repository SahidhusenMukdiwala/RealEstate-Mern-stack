import express from 'express';
import { VerifyToken } from '../Utils/verifyUser.js';
import { CreateContect } from '../Controllers/ContectController.js';

const router = express.Router()

router.post('/query/message',VerifyToken,CreateContect)

export default router