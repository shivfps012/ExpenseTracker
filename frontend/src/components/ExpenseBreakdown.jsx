import React from 'react';
import { formatCurrency } from '../utils/currency';

export default function ExpenseBreakdown({ expenses }) {
    // Hide the component if there are no expenses
    if (!expenses || expenses.length === 0) return null;

    // 1. Get the grand total for percentage calculations
    const totalCents = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // 2. Group expenses by category
    const categoryTotals = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    // 3. Convert to an array, calculate percentages, and sort from highest to lowest
    const sortedBreakdown = Object.entries(categoryTotals)
        .map(([category, amount]) => ({
            category,
            amount,
            percentage: ((amount / totalCents) * 100).toFixed(1) // Keep one decimal place
        }))
        .sort((a, b) => b.amount - a.amount);

    return (
        <div style={{ 
            backgroundColor: '#ffffff', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0', 
            marginBottom: '2rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#1e293b' }}>
                Expense Breakdown
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sortedBreakdown.map(item => (
                    <div key={item.category}>
                        {/* Text Details */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.875rem' }}>
                            <span style={{ color: '#475569', fontWeight: '500' }}>
                                {item.category} ({item.percentage}%)
                            </span>
                            <span style={{ fontWeight: 'bold', color: '#0f172a' }}>
                                {formatCurrency(item.amount)}
                            </span>
                        </div>
                        
                        {/* Visual Percentage Bar */}
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ 
                                width: `${item.percentage}%`, 
                                height: '100%', 
                                backgroundColor: '#3b82f6', // Blue bar
                                borderRadius: '999px' 
                            }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}