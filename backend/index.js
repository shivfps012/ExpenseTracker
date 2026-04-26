require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // 1. Import helmet
const morgan = require('morgan'); // 2. Import morgan

const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// --- Core Middlewares ---

// 3. Add Helmet FIRST to secure HTTP headers
app.use(helmet()); 

// 4. Add Morgan for logging. 
// 'dev' is a preset format that color-codes the status (e.g., green for 200, red for 500)
app.use(morgan('dev')); 

app.use(cors());
app.use(express.json());

// --- Mount Routes ---
app.use('/api/expenses', expenseRoutes);

// --- Global Error Handler ---
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});