const express = require('express');
const userRouter = express.Router();
const userQueries = require('../db/userQueries');
const { verifyToken, authorizeRole, verifyUserOwner } = require('../middleware/authMiddleware')

// Error catcher
const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

// Get all users
userRouter.get('/',
    verifyToken,
    authorizeRole('admin'),
    wrap(async (req, res) => {
        const user = await userQueries.getAllUsers()
        res.send(user)
    }))

// Get user by ID
userRouter.get('/user-by-id/:id', wrap(async (req, res) => {
    const user = await userQueries.getUserById(req.params.id)
    res.send(user)
}))

// Get user by email
userRouter.get('/user-by-name/:email',
    verifyToken,
    authorizeRole('admin'),
    wrap(async (req, res) => {
        const user = await userQueries.getUserByEmail(req.params.email)
        res.send(user)
    }))

// Create new user
userRouter.post('/', wrap(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const provider = req.body.provider;
    const providerKey = req.body.provider_key;
    const newUser = await userQueries.createUser(name, email, provider, providerKey)
    res.send(newUser)
}))

// Update user profile
userRouter.put('/user-by-id/:id',
    verifyToken,
    authorizeRole('user', 'admin'),
    verifyUserOwner,
    wrap(async (req, res) => {
        const name = req.body.name;
        const updatedUser = await userQueries.updateUserProfile(req.params.id, name)
        res.send(updatedUser)
    }))

// Delete user
userRouter.delete('/user-by-id/:id',
    verifyToken,
    authorizeRole('user', 'admin'),
    verifyUserOwner,
    wrap(async (req, res) => {
        const deletedBody = await userQueries.deleteUser(req.params.id)
        res.send(deletedBody)
    }))

module.exports = userRouter;