import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { useExpenses } from './hooks/useExpenses';
import { formatCurrency } from './utils/currency';

export default function App() {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('date_desc');

    const { expenses, loading, error, refetch } = useExpenses(categoryFilter, sortOrder);

    // Calculate total purely based on the currently filtered/sorted array
    const totalCents = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Personal Expense Tracker</h1>
            
            <ExpenseForm onExpenseAdded={refetch} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                    <input 
                        type="text" 
                        placeholder="Filter by category..." 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        style={{ marginRight: '1rem' }}
                    />
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="date_desc">Newest First</option>
                        <option value="date_asc">Oldest First</option>
                    </select>
                </div>
                <h2>Total: {formatCurrency(totalCents)}</h2>
            </div>

            <ExpenseList expenses={expenses} loading={loading} error={error} />
        </div>
    );
}