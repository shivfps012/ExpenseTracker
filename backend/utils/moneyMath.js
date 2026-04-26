// Converts an amount like 10.50 to 1050 (integer)
const toCents = (amount) => {
    return Math.round(parseFloat(amount) * 100);
};

module.exports = { toCents };