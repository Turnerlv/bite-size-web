const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const userQueries = require('../db/userQueries')

const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
};

const auth = {

    // Create new account
    async createAccount(name, email, providerKey) {

        if (!validator.isEmail(email)) {
            const error = new Error('Invalid email');
            error.statusCode = 400;
            throw error;
        }

        if (!providerKey) {
            const error = new Error('Missing required authentication parameters');
            error.statusCode = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(providerKey, 10);
        const newUser = await userQueries.createUser(name, email, 'local', hashedPassword);
        const token = generateAccessToken(newUser);

        return {
            message: "User account created!",
            token,
            user: { id: newUser.id, name: newUser.name, role: newUser.role }
        };
    },

    // Login user
    async login(email, providerKey) {
        const user = await userQueries.getUserByEmail(email);
     
        if (!user) {
            const error = new Error('Invalid email or password.');
            error.statusCode = 401;
            throw error;
        }
        
        const isPasswordMatch = await bcrypt.compare(providerKey, user.provider_key);

        if (!isPasswordMatch) {
            const error = new Error('Invalid email or password.');
            error.statusCode = 401;
            throw error;
        }

        const token = generateAccessToken(user);
        

        return {
            message: "Login successful!",
            token,
            user: { id: user.id, name: user.name, role: user.role }
        };

    },

    // Change password
    async changePassword(userId, currentPassword, newPassword) {
        const user = await userQueries.getUserById(userId);

        if (user.provider !== 'local') {
            const error = new Error(`User registered through ${user.provider}. Please authenticated through their portal.`);
            error.statusCode = 401;
            throw error;
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.provider_key);

        if (!isPasswordMatch) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await userQueries.updatePassword(user.id, hashedPassword);

        const token = generateAccessToken(user);
        return { token, user: { id: user.id, name: user.name, role: user.role } };
    }
}

module.exports = auth;