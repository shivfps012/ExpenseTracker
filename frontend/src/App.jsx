import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseBreakdown from './components/ExpenseBreakdown';
import { useExpenses } from './hooks/useExpenses';
import { formatCurrency } from './utils/currency';

export default function App() {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('date_desc');

    const { expenses, loading, error, refetch } = useExpenses(categoryFilter, sortOrder);

    const totalCents = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div className="app-shell">
            <main className="app-container">
                <header className="card summary-card">
                    <h1 className="app-title">Personal Expense Tracker</h1>
                    <p className="app-subtitle">Track expenses quickly with simple filters and clear totals.</p>

                    <div className="total-box">
                        <p className="total-label">Total Expenses</p>
                        <h2 className="total-value">{formatCurrency(totalCents)}</h2>
                    </div>
                </header>

                <section className="top-grid">
                    <div className="card">
                        <ExpenseForm onExpenseAdded={refetch} />
                    </div>

                    <div className="card">
                        <ExpenseBreakdown expenses={expenses} />
                    </div>
                </section>

                <section className="card">
                    <ExpenseFilter
                        categoryFilter={categoryFilter}
                        setCategoryFilter={setCategoryFilter}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                </section>

                <section className="card">
                    <ExpenseList expenses={expenses} loading={loading} error={error} />
                </section>
            </main>
        </div>
    );
}