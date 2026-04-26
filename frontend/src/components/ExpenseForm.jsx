import React, { useState } from 'react';
import { EXPENSE_CATEGORIES } from '../utils/constants';

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
            const response = await fetch('http://localhost:5000/api/expenses', {
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
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>Add Expense</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input 
                    type="number" step="0.01" min="0.01" placeholder="Amount (₹)" 
                    value={amount} onChange={e => setAmount(e.target.value)} required 
                    style={{ flex: 1, padding: '0.5rem' }}
                />
                
                {/* --- NEW DROPDOWN --- */}
                <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    required 
                    style={{ flex: 1, padding: '0.5rem' }}
                >
                    <option value="" disabled>Select a Category</option>
                    {EXPENSE_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                {/* ------------------ */}

                <input 
                    type="date" 
                    value={date} onChange={e => setDate(e.target.value)} required 
                    style={{ flex: 1, padding: '0.5rem' }}
                />
            </div>
            <input 
                type="text" placeholder="Description (Optional)" 
                style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                value={description} onChange={e => setDescription(e.target.value)} 
            />
            <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
                {loading ? 'Saving...' : 'Save Expense'}
            </button>
        </form>
    );
}