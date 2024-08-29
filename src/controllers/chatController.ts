import { Request, Response } from "express";
import Chat from "../models/Chat";
import User from "../models/User";
import mongoose from 'mongoose';


export const createChat = async (req: Request, res: Response) => {
    try {
        const { participants } = req.body;

        if (participants.length != 2) {
            return res.status(400).json({ message: 'A chat must have two participants' });
        }

        for (const participant of participants) {
            if (!mongoose.Types.ObjectId.isValid(participant)) {
                return res.status(400).json({ message: `Invalid participant ID: ${participant}` });
            }
        }

        const users = await User.find({ _id: { $in: participants } });
        if (users.length !== participants.length) {
            return res.status(400).json({ message: 'One or more users do not exist' });
        }

        const existingChat = await Chat.findOne({
            participants: { $all: participants },
            $expr: { $eq: [{ $size: "$participants" }, participants.length] }
        });

        if (existingChat) {
            return res.status(400).json({ message: 'Chat already exists between these participants' });
        }

        const newChat = new Chat({ participants, messages: [] });
        await newChat.save();

        res.status(201).json({ message: 'Chat created successfully'});

    } catch (err) {
        res.status(500).json({ message: 'Error creating chat', err });
    }
}


export const sendMessage = async (req: Request, res: Response) => {
    try{
        const { chatId, senderId, message} = req.body;
        if (message.trim() === '') {
            return res.status(400).json({ message: 'Message cannot be empty' });
        }
        if (!mongoose.Types.ObjectId.isValid(chatId) || !mongoose.Types.ObjectId.isValid(senderId)) {
            return res.status(400).json({ message: 'Invalid chat or sender ID.' });
        }

        const user = await User.findById(senderId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        if (!chat.participants.includes(senderId)) {
            return res.status(403).json({ message: 'You are not a participant in this chat' });
        }
        
        const newMessage = { sender: senderId, content: message, timestamp: new Date(), seen: false };
        chat.messages.push(newMessage);
        await chat.save();

        res.status(200).json({ message: 'Message sent successfully'});
    } catch(err)
    {
        res.status(500).json({ message: 'Error sending message', err });
    }
};