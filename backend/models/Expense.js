const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: { 
        type: Number, 
        required: true,
        min: 1 // Must be at least 1 cent
    },
    category: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        default: '' 
    },
    date: { 
        type: Date, 
        required: true 
    },
    idempotencyKey: { 
        type: String, 
        required: true, 
        unique: true // Prevents duplicate submissions
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

module.exports = mongoose.model('Expense', expenseSchema);