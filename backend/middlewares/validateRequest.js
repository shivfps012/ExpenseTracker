const validateExpense = (req, res, next) => {
    const { amount, category, date, idempotencyKey } = req.body;

    if (!amount || amount <= 0) {
        res.status(400);
        return next(new Error('Amount must be a positive number greater than zero'));
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
        res.status(400);
        return next(new Error('Category is required'));
    }

    if (!date || isNaN(Date.parse(date))) {
        res.status(400);
        return next(new Error('A valid date is required'));
    }

    if (!idempotencyKey) {
        res.status(400);
        return next(new Error('Idempotency key is missing for retry protection'));
    }

    // If all checks pass, move on to the controller
    next(); 
};

module.exports = { validateExpense };