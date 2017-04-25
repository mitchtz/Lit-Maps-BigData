/**
 * Module dependencies.
 */
const express = require('express')
const promise = require('bluebird')
const compression = require('compression')
const bodyParser = require('body-parser')
const logger = require('morgan')
const chalk = require('chalk')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
const flash = require('express-flash')
const path = require('path')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const expressStatusMonitor = require('express-status-monitor')
const assert = require('assert')
const cors = require('cors')
const request = require('request')
const async = require('async')

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' })

/**
 * Controllers (route handlers).
 */
 const songController = require('./controllers/song')
 const tweetController = require('./controllers/tweet')

 /**
 * Create Express server.
 */
const server = express()

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'))
  process.exit()
})

server.set('superSecret', process.env.SECRET)

/**
 * Express configuration.
 */
server.set('port', process.env.PORT || 8080)
server.use(expressStatusMonitor())
server.use(compression())

server.use(logger('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(expressValidator())
server.use(cors())

/**
 * Primary server routes.
 */
server.get('/songs', songController.getAllSongs)
server.get('/songs/:songID', songController.getSong)
server.get('/tweets/:songID', tweetController.getTweets)


/**
 * Error Handler.
 */
server.use(errorHandler())

/**
 * Start Express server.
 */
server.listen(server.get('port'), () => {
  console.log('%s Server is running at http://localhost:%d in %s mode', chalk.green('✓'), server.get('port'), server.get('env')) 
  console.log('  Press CTRL-C to stop\n')
})

module.exports = server
