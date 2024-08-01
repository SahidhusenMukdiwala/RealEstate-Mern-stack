import express from 'express';
import { CreateMessage, getMessages } from '../Controllers/MessageController.js';
import { VerifyToken,VerifyToken2 } from '../Utils/verifyUser.js';
 
const router = express.Router();

router.post('/messages/:chatId/CreateMessage',VerifyToken2,CreateMessage)
router.get('/messages/:chatId/getmessages',VerifyToken2,getMessages)

export default router;