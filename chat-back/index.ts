import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './src/routes/userRoutes';
import chatRoutes from './src/routes/chatRoutes';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http'; 
import { Server } from 'socket.io';
import Chat from './src/models/Chat';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/Jatdev';
mongoose.connect(mongoURI, {})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
        console.log(`User joined chat: ${chatId}`);
    });

    socket.on('sendMessage', async (messageData) => {
        try {
            const { chatId, senderId, content } = messageData;

            const newMessage = {
                sender: senderId,
                content,
                timestamp: new Date(),
                seen: false,
            };

            await Chat.findByIdAndUpdate(
                chatId,
                { $push: { messages: newMessage }},
                { new: true }
            );

            io.to(chatId).emit('receiveMessage', newMessage);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
