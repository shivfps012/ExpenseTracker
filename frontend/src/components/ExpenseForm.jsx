import React, { useState } from 'react';
import PropTypes from 'prop-types'; // 1. Import PropTypes
import { getApiBaseUrl } from '../api/client';
import { EXPENSE_CATEGORIES } from '../utils/constants';

const API_BASE_URL = getApiBaseUrl();

export default function ExpenseForm({ onExpenseAdded }) {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const expenseData = {
            amount,
            category,
            description,
            date,
            idempotencyKey: crypto.randomUUID()
        };

        try {
            // Adjust to your API client or fetch call as needed
            const response = await fetch(`${API_BASE_URL}/expenses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expenseData)
            });

            if (!response.ok) throw new Error('Failed to save expense');
            
            // Reset form
            setAmount('');
            setCategory(''); // Reset dropdown
            setDescription('');
            onExpenseAdded(); 
            
        } catch (err) {
            setError('Error saving expense. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <h3 className="section-title">Add Expense</h3>
            {error && <p className="error-text">{error}</p>}

            <div className="form-grid">
                <input 
                    type="number" step="0.01" min="0.01" placeholder="Amount (₹)" 
                    value={amount} onChange={e => setAmount(e.target.value)} required 
                    className="input-control"
                />
                
                <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    required 
                    className="input-control"
                >
                    <option value="" disabled>Select a Category</option>
                    {EXPENSE_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <input 
                    type="date" 
                    value={date} onChange={e => setDate(e.target.value)} required 
                    className="input-control"
                />
            </div>
            <input 
                type="text" placeholder="Description (Optional)" 
                className="input-control input-full"
                value={description} onChange={e => setDescription(e.target.value)} 
            />
            <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Saving...' : 'Save Expense'}
            </button>
        </form>
    );
}
ExpenseForm.propTypes = {
    onExpenseAdded: PropTypes.func.isRequired,
};