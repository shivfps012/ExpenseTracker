import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../utils/currency';

export default function ExpenseList({ expenses, loading, error }) {
    if (loading) return <p className="helper-text">Loading expenses...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (expenses.length === 0) return <p className="helper-text">No expenses found.</p>;

    return (
        <div className="table-wrap">
            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(exp => (
                        <tr key={exp._id}>
                            <td>{new Date(exp.date).toLocaleDateString()}</td>
                            <td>{exp.category}</td>
                            <td>{exp.description || '-'}</td>
                            <td className="amount-cell">{formatCurrency(exp.amount)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
ExpenseList.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            category: PropTypes.string.isRequired,
            description: PropTypes.string, // Optional
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    // error can be a string, or null if there is no error
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null])
    ]),
};