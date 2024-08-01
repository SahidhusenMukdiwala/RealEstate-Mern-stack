import express from 'express';
import { NewChats,AllChats, getChat } from '../Controllers/ChatController.js';
import { VerifyToken } from '../Utils/verifyUser.js';
const router = express.Router();

// router.post('/chats/:id',VerifyToken,NewChats)
router.post('/chats',VerifyToken,NewChats)
router.get('/chats/Allchats',VerifyToken,AllChats)
router.get('/chats/:chatId/getChat',VerifyToken,getChat)


export default router;