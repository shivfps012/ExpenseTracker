import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseBreakdown from './components/ExpenseBreakdown'; // Imported the new component
import { useExpenses } from './hooks/useExpenses';
import { formatCurrency } from './utils/currency';

export default function App() {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('date_desc');

    const { expenses, loading, error, refetch } = useExpenses(categoryFilter, sortOrder);

    // Calculate total purely based on the currently filtered/sorted array
    const totalCents = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
            <h1 style={{ color: '#0f172a', marginBottom: '2rem', textAlign: 'center' }}>
                Personal Expense Tracker
            </h1>
            
            <ExpenseForm onExpenseAdded={refetch} />

            {/* Header for Total */}
            <div style={{ padding: '1rem 0', borderBottom: '2px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, color: '#1d4ed8', fontSize: '1.75rem' }}>
                    Total: {formatCurrency(totalCents)}
                </h2>
            </div>

            {/* --- NEW BREAKDOWN UI --- */}
            <ExpenseBreakdown expenses={expenses} />
            {/* ------------------------ */}

            {/* Filters and List */}
            <ExpenseFilter 
                categoryFilter={categoryFilter} 
                setCategoryFilter={setCategoryFilter} 
                sortOrder={sortOrder} 
                setSortOrder={setSortOrder} 
            />

            <ExpenseList expenses={expenses} loading={loading} error={error} />
        </div>
    );
}