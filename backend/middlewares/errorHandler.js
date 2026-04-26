const errorHandler = (err, req, res, next) => {
    // If the status code is already set (e.g., to 400), use it. Otherwise default to 500 (Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        error: err.message,
        // Hide stack traces in production to prevent leaking sensitive server details
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;