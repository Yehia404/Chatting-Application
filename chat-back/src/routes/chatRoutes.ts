import express from 'express';
import { createChat, sendMessage } from '../controllers/chatController';
const router = express.Router();


router.post('/create', createChat);
router.post('/send', sendMessage);

export default router;