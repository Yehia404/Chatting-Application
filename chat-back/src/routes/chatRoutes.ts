import express from 'express';
import { createChat, getMessages, sendMessage } from '../controllers/chatController';
const router = express.Router();


router.post('/create', createChat);
router.post('/send', sendMessage);
router.get('/getmsg', getMessages);

export default router;