const express = require('express')
const authRouter = express.Router()
const auth = require('../controllers/auth')
const { verifyToken } = require('../middleware/authMiddleware')

// Error catcher
const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

// Create account
authRouter.post('/create-account', wrap(async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const providerKey = req.body.provider_key
    const user = await auth.createAccount(name, email, providerKey)
    const token = user.token
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 1 // 1 minute
    })
    res.status(201)
    res.send(user)
}))

// Login
authRouter.post('/login', wrap(async (req, res) => {
    const email = req.body.email
    const providerKey = req.body.provider_key
    const user = await auth.login(email, providerKey)
    const token = user.token

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 // 1 minute
    })

    res.cookie('user_context', JSON.stringify(user.user), {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 // 1 minute
    })

    res.send(user)
}))

// Change password
authRouter.put('/change-password',
    verifyToken,
    wrap(async (req, res) => {
        const userId = req.user.userId
        const currentPassword = req.body.current_password
        const newPassword = req.body.new_password
        const user = await auth.changePassword(userId, currentPassword, newPassword)
        res.send(user)
    }))

module.exports = authRouter;