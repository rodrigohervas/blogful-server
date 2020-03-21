require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const accessHandler = require('./access-handler')
const { NODE_ENV } = require('./config')
const errorHandler = require('./error-handler')
const articlesRouter = require('./api/articles/articles.router')
const usersRouter = require('./api/users/users.router')
const commentsRouter = require('./api/comments/comments.router')

const app = express()
const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common'

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(accessHandler)


//ENDPOINTS
//=> / home
app.route('/')
    .get((req, res) => {
        res.status(200).json('Welcome to Blogful API')
    })
//=> /api/ home
app.route('/api/')
    .get((req, res) => {
        res.status(200).json('Welcome to Blogful API')
    })

// => /api/articles
app.use('/api/articles', articlesRouter)

// => /api/users
app.use('/api/users', usersRouter)

// => /api/comments
app.use('/api/comments', commentsRouter)


app.use(errorHandler)

module.exports = app