// Uses an environment variable if available (e.g., in Vite), falling back to localhost
const BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = async (endpoint, options = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok) {
        // Attempt to parse the backend's JSON error response
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'An unexpected API error occurred');
    }

    return response.json();
};