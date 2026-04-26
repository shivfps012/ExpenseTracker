import { useState, useEffect, useCallback } from 'react';

export const useExpenses = (categoryFilter, sortOrder) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchExpenses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            if (categoryFilter) params.append('category', categoryFilter);
            if (sortOrder) params.append('sort', sortOrder);

            const response = await fetch(`http://localhost:5000/api/expenses?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch data');
            
            const data = await response.json();
            setExpenses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [categoryFilter, sortOrder]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    return { expenses, loading, error, refetch: fetchExpenses };
};