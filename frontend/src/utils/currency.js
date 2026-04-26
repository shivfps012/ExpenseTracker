// Converts cents (integer) back to readable currency string
export const formatCurrency = (cents) => {
    return `₹${(cents / 100).toFixed(2)}`;
};