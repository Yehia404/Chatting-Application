import { Request, Response } from "express";
import Chat from "../models/Chat";
import User from "../models/User";



export const createChat = async (req: Request, res: Response) => {
    try{
    const {participants} = req.body;

    if (participants.length < 2) {
        return res.status(400).json({ message: 'A chat must have at least two participants' });
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

    res.status(201).json({ message: 'Chat created successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error creating chat', error });
    }
}
