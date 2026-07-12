const errorMiddleware = (err, req, res, next) => {
    console.error("Error:", err);

    let status = err.statusCode || err.status || 500;
    let message = err.message || "Internal Server Error";

    // Handle NOT NULL violations (Code 23502)
    if (err.code === '23502') {
        status = 400;
        switch (err.column) {
            case 'provider':
                message = 'Authentication provider type must be specified';
                break;
            case 'provider_key':
                message = 'A password or auth token key is required to create an account';
                break;
            case 'name':
                message = 'User profile name cannot be left blank';
                break;
            case 'email':
                message = 'An email address is mandatory';
                break;
            default:
                message = `Missing required field: ${err.column}`;
        }
    }

    // Handle Unique Violations (Code 23505)
    if (err.code === '23505') {
        status = 409;
        if (err.constraint === 'unique_provider_key') {
            message = 'Authentication provider key already exists for a user';
        }
        else {
            message = 'Email already exists';
        }
    }

    // Handle Foreign Key Violations (Code 23503)
    else if (err.code === '23503') {
        status = 404;
        message = 'Author or User reference does not exist';
    }

    // Handle CHECK Constraints (Code 23514)
    else if (err.code === '23514') {
        status = 400;
        switch (err.constraint) {
            case 'email_validation_check':
                message = 'Invalid email format';
                break;
            case 'email_trim_check':
                message = 'Email cannot have leading or trailing whitespace';
                break;
            case 'title_length_check':
                message = 'Title must be at least 5 characters long';
                break;
            case 'content_length_check':
                message = 'Content is too short; it needs to be at least 50 characters';
                break;
            case 'content_trim_check':
                message = 'Content cannot have leading or trailing whitespace';
                break;
            default:
                message = 'Validation error occurred';
        }
    }

    res.status(status).json({
        error: message
    });
};

module.exports = errorMiddleware;