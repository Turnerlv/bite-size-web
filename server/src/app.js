const path = require('path');
const express = require('express');
var cors = require('cors')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const blogsRouter = require('./routes/blogsRouter');
const authRouter = require('./routes/authRouter')
const tokenCheck = require('./middleware/tokenCheck');
const errorMiddleware = require('./middleware/errorMiddleware');

// express app
const app = express();

// middleware
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(tokenCheck)
app.use(cookieParser())

// routes
app.use('/api/auth', authRouter)

app.use('/api/users', userRouter)

app.use('/api/blogs', blogsRouter)

// error handler

app.use(errorMiddleware)

// PRODUCTION BUILD PATH CODE
if (process.env.NODE_ENV === 'production') {
    const frontendBuildPath = path.join(__dirname, '../client/.next/server/app');

    app.use(express.static(path.join(__dirname, '../client/.next')));

    // catch-all wildcard (Express v5 compatible)
    app.get('/:splat(.*)', (req, res) => {
        res.sendFile(path.join(frontendBuildPath, 'index.html'));
    });
}

module.exports = app;

