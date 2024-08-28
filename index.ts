import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/Jatdev'; // Update this URI as needed
mongoose.connect(mongoURI, {
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
