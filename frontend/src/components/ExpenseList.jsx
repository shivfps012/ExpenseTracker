import React from 'react';
import { formatCurrency } from '../utils/currency';

export default function ExpenseList({ expenses, loading, error }) {
    if (loading) return <p>Loading expenses...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (expenses.length === 0) return <p>No expenses found.</p>;

    return (
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={{ borderBottom: '1px solid #000', padding: '8px' }}>Date</th>
                    <th style={{ borderBottom: '1px solid #000', padding: '8px' }}>Category</th>
                    <th style={{ borderBottom: '1px solid #000', padding: '8px' }}>Description</th>
                    <th style={{ borderBottom: '1px solid #000', padding: '8px' }}>Amount</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map(exp => (
                    <tr key={exp._id}>
                        <td style={{ padding: '8px' }}>{new Date(exp.date).toLocaleDateString()}</td>
                        <td style={{ padding: '8px' }}>{exp.category}</td>
                        <td style={{ padding: '8px' }}>{exp.description}</td>
                        <td style={{ padding: '8px' }}>{formatCurrency(exp.amount)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}