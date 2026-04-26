import React from 'react';
import { EXPENSE_CATEGORIES } from '../utils/constants';

export default function ExpenseFilter({ categoryFilter, setCategoryFilter, sortOrder, setSortOrder }) {
    return (
        <div className="filter-grid">
            <div>
                <label htmlFor="categoryFilter" className="field-label">
                    Filter by Category
                </label>

                <select
                    id="categoryFilter"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="input-control"
                >
                    <option value="">All Categories</option>
                    {EXPENSE_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

            </div>
            
            <div>
                <label htmlFor="sortOrder" className="field-label">
                    Sort by Date
                </label>
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="input-control"
                >
                    <option value="date_desc">Newest First</option>
                    <option value="date_asc">Oldest First</option>
                </select>
            </div>
        </div>
    );
}