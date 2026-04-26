import React from 'react';
import { formatCurrency } from '../utils/currency';

export default function Summary({ expenses }) {
    if (!expenses || expenses.length === 0) return null;

    // 1. Calculate grand total (using integer cents)
    const totalCents = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // 2. Calculate totals per category
    const categoryTotals = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    return (
        <div style={{ 
            backgroundColor: '#eff6ff', 
            padding: '1.5rem', 
            borderRadius: '6px', 
            marginBottom: '1.5rem',
            border: '1px solid #bfdbfe'
        }}>
            <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#1e40af' }}>
                Visible Total: {formatCurrency(totalCents)}
            </h2>
            
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#1d4ed8' }}>
                Summary by Category:
            </h4>
            
            <ul style={{ 
                margin: 0, 
                padding: 0, 
                listStyleType: 'none', 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '0.75rem' 
            }}>
                {Object.entries(categoryTotals).map(([category, amount]) => (
                    <li key={category} style={{ 
                        fontSize: '0.875rem', 
                        backgroundColor: '#fff', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '999px', 
                        border: '1px solid #93c5fd' 
                    }}>
                        <strong>{category}:</strong> {formatCurrency(amount)}
                    </li>
                ))}
            </ul>
        </div>
    );
}