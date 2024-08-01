import express from 'express';
import { CreateMessage, getMessages } from '../Controllers/MessageController.js';
import { VerifyToken } from '../Utils/verifyUser.js';
 
const router = express.Router();

router.post('/messages/:chatId/CreateMessage',VerifyToken,CreateMessage)
router.get('/messages/:chatId/getmessages',VerifyToken,getMessages)

export default router;