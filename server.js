import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import router from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', router);

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
