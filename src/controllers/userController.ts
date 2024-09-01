import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const jwtSecret = process.env.JWT_SECRET! || 'default_secret';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;

        if (typeof firstname !== 'string' || validator.isEmpty(firstname) || !validator.isAlpha(firstname) || firstname.length < 2) {
            return res.status(400).json({ message: 'Invalid firstname' });
        }

        if (typeof lastname !== 'string' || validator.isEmpty(lastname) || !validator.isAlpha(lastname) || lastname.length < 2) {
            return res.status(400).json({ message: 'Invalid lastname' });
        }

        const isValidUsername = /^[a-zA-Z0-9_\s]+$/.test(username);
        if (typeof username !== 'string' || validator.isEmpty(username) || !isValidUsername || username.length < 2) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        if (typeof email !== 'string' || validator.isEmpty(email) || !validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        if (typeof password !== 'string' || validator.isEmpty(password) || !validator.isStrongPassword(password, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0})) {
            return res.status(400).json({ message: 'Invalid password' });
        }


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

        if (typeof email !== 'string' || validator.isEmpty(email) || !validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        if (typeof password !== 'string' || validator.isEmpty(password) || !validator.isStrongPassword(password, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0})) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ message: 'User logged in successfully', token: token });
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

export const getUserInfo = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, jwtSecret) as { userId: string };
        const user = await User.findById(decoded.userId).select('firstname lastname username email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error getting user', error });
    }
}
