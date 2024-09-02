import express from 'express';
import { createChat, getChats, getMessages, sendMessage } from '../controllers/chatController';
const router = express.Router();


router.post('/create', createChat);
router.post('/send', sendMessage);
router.get('/getmsgs', getMessages);
router.get('/getchats', getChats);

export default router;