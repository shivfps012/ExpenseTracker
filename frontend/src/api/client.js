// Uses an environment variable if available (e.g., in Vite), falling back to localhost.
// Normalizes the value so both "https://site.com" and "https://site.com/api" work.
const RAW_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';
const NORMALIZED_BASE_URL = RAW_BASE_URL.replace(/\/$/, '');
const BASE_URL = NORMALIZED_BASE_URL.endsWith('/api')
    ? NORMALIZED_BASE_URL
    : `${NORMALIZED_BASE_URL}/api`;

export const getApiBaseUrl = () => BASE_URL;

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