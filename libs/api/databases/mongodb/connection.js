const config = require('config')
const chalk = require('chalk')
const mongoose = require('mongoose')

const db = config.api.db.mongo
const connectionString = `mongodb+srv://${db.user}:${db.password}@${db.host}?retryWrites=true`

/**
 * Method: Create a connection in DB.
 */
function connection () {
  mongoose.connect(connectionString, { useNewUrlParser: true }).then(async (conn) => {
    console.info(chalk.bold('db connected as'), chalk.green(db.user.toUpperCase()))
    litenersRegister(conn.connection)
  })
}

/**
 * Method: mongo listeners register
 * @param {Object} connection MongoDB connection
 */
function litenersRegister (connection) {
  connection.on('error', function (err) {
    console.error('MongoDB connection error:', err)
  })
  connection.once('open', function callback () {
    console.info('MongoDB connection is established with user ' + db.user)
  })
  connection.once('connecting', function callback () {
    console.info('MongoDB connection is established with user ' + db.user)
  })
  connection.on('disconnected', function () {
    console.error('MongoDB disconnected!')
    mongoose.connect(connectionString, { useNewUrlParser: true })
  })
  connection.on('reconnected', function () {
    console.info('MongoDB reconnected!')
  })
}

module.exports = connection
