const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Fallback to localhost if the environment variable isn't set
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker';

        const conn = await mongoose.connect(mongoURI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Exit the process with failure code if the DB fails to connect
        process.exit(1); 
    }
};

module.exports = connectDB;