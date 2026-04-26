const Expense = require('../models/Expense');
const { toCents } = require('../utils/moneyMath');

const createExpense = async (req, res) => {
    try {
        const { amount, category, description, date, idempotencyKey } = req.body;

        // Basic validation
        if (!amount || amount <= 0 || !category || !date || !idempotencyKey) {
            return res.status(400).json({ error: 'Missing required fields or invalid amount' });
        }

        // Convert amount to cents for safe storage
        const amountInCents = toCents(amount);

        const newExpense = new Expense({
            amount: amountInCents,
            category,
            description,
            date,
            idempotencyKey
        });

        await newExpense.save();
        res.status(201).json(newExpense);

    } catch (error) {
        // Handle MongoDB duplicate key error (11000) for idempotency
        if (error.code === 11000) {
            // The request was already processed, safely return success
            return res.status(200).json({ message: 'Expense already recorded' });
        }
        console.error('Create error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getExpenses = async (req, res) => {
    try {
        const { category, sort } = req.query;
        let query = {};
        
        if (category) {
            query.category = category;
        }

        // Default sort is newest first
        let sortObj = { date: -1 };
        if (sort === 'date_asc') sortObj = { date: 1 };

        const expenses = await Expense.find(query).sort(sortObj);
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { createExpense, getExpenses };