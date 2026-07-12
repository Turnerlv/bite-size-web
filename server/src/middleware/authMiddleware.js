const jwt = require('jsonwebtoken')
const blogQueries = require('../db/blogQueries');

// Error catcher
const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

//Verify auth token
const verifyToken = (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        const error = new Error('Access denied');
        error.statusCode = 401;
        throw error;
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                const error = new Error(`Access denied: ${err}`);
                error.statusCode = 401;
                throw error;
            }
            const { userId, role } = decoded;
            req.user = { userId, role };
            next()
        })
    }
}

// Authorize roles
const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            const error = new Error('Unauthorized: No user session found');
            error.statusCode = 401;
            throw error;
        }

        if (!allowedRoles.includes(req.user.role)) {
            const error = new Error('Forbidden: User role cannot access this resource');
            error.statusCode = 403;
            throw error;
        }
        next()
    }
}

// Verify owner (e.g. blog)
const verifyResourceOwner = (getResourceByFunction) => wrap(async (req, res, next) => {
    const user = req.user.userId;
    const userRole = req.user.role;

    if (userRole === 'admin') {
        return next();
    }

    const resourceId = req.params.id;
    const resource = await getResourceByFunction(resourceId)

    if (user !== resource.author_id) {
        const error = new Error('Forbidden: User role cannot access this resource');
        error.statusCode = 403;
        throw error;
    }
    next()

})

const verifyUserOwner = wrap(async (req, res, next) => {
    const targetUser = parseInt(req.params.id, 10);
    const user = req.user.userId;
    const userRole = req.user.role;

    if (userRole === 'admin') {
        return next();
    }

    if (user !== targetUser) {
        const error = new Error('You are not authorized to modify this user account.');
        error.statusCode = 403;
        throw error;
    }
    next()
})

module.exports = { verifyToken, authorizeRole, verifyResourceOwner, verifyUserOwner }