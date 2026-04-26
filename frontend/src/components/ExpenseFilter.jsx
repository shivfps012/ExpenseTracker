import React from 'react';

export default function ExpenseFilter({ categoryFilter, setCategoryFilter, sortOrder, setSortOrder }) {
    return (
        <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '1.5rem', 
            padding: '1rem', 
            backgroundColor: '#f8fafc', 
            border: '1px solid #e2e8f0',
            borderRadius: '6px' 
        }}>
            <div style={{ flex: 1 }}>
                <label htmlFor="categoryFilter" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                    Filter by Category
                </label>
                <input
                    id="categoryFilter"
                    type="text"
                    placeholder="e.g., Food, Transport..."
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                />
            </div>
            
            <div style={{ flex: 1 }}>
                <label htmlFor="sortOrder" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                    Sort by Date
                </label>
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                >
                    <option value="date_desc">Newest First</option>
                    <option value="date_asc">Oldest First</option>
                </select>
            </div>
        </div>
    );
}