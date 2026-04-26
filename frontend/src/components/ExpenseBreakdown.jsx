import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../utils/currency';

export default function ExpenseBreakdown({ expenses }) {
    const totalCents = expenses && expenses.length > 0 
        ? expenses.reduce((sum, exp) => sum + exp.amount, 0) 
        : 0;

    if (!expenses || expenses.length === 0) {
        return (
            <div className="breakdown">
                <h3 className="section-title">Expense Breakdown</h3>
                <p className="helper-text">No expense data to display yet. Add expenses to see the breakdown.</p>
            </div>
        );
    }

    const categoryTotals = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    const sortedBreakdown = Object.entries(categoryTotals)
        .map(([category, amount]) => ({
            category,
            amount,
            percentage: ((amount / totalCents) * 100).toFixed(1)
        }))
        .sort((a, b) => b.amount - a.amount);

    return (
        <div className="breakdown">
            <h3 className="section-title">
                Expense Breakdown
            </h3>
            
            <div className="breakdown-list">
                {sortedBreakdown.map(item => (
                    <div key={item.category} className="breakdown-item">
                        <div className="breakdown-row">
                            <span className="breakdown-label">
                                {item.category} ({item.percentage}%)
                            </span>
                            <span className="breakdown-value">
                                {formatCurrency(item.amount)}
                            </span>
                        </div>

                        <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
ExpenseBreakdown.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            amount: PropTypes.number.isRequired,
            category: PropTypes.string.isRequired,
        })
    ).isRequired, // We only strictly need amount and category for this component's logic
};