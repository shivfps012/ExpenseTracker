// backend/index.js
require('dotenv').config(); // Load environment variables first
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Core Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Mount Routes
app.use('/api/expenses', expenseRoutes);

// Global Error Handler (MUST be the last middleware)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});