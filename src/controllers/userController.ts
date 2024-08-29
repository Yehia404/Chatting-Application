import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ firstname, lastname, username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        res.status(200).json({ message: 'User logged in successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

export const searchUsers = async (req: Request, res: Response) => {
    try {
        const { query }= req.body;

        if (typeof query !== 'string' || query.trim() === '') {
            return res.status(400).json({ message: 'Invalid search query' });
        }

        const users = await User.find({
            username: { $regex: query, $options: 'i' }
        }).select('username'); 

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Error searching users', error });
    }
};
