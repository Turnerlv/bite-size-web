const config = require('../../config')

const tokenCheck = (req, res, next) => {
    const api = req.get('x-api-key')

    if (api !== config.apiClientSecret) {
        return res.status(401).json({ message: 'Invalid token' })
    } else {
        const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })
        req.authorizedTime = formatter.format(Date.now())
    }
    next()
}

module.exports = tokenCheck