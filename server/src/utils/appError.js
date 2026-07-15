// utils/appError.js
class AppError extends Error {
    constructor(message, statusCode) {
        super(message); // Call the original Error constructor

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Useful to distinguish "known" errors from "bugs"

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;