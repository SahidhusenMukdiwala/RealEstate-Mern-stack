import express from 'express';
import { NewChats,AllChats } from '../Controllers/ChatController.js';
import { VerifyToken } from '../Utils/verifyUser.js';
const router = express.Router();

router.post('/chats/:id',VerifyToken,NewChats)
router.get('/chats/Allchats',VerifyToken,AllChats)


export default router;