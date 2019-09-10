const config = require('config')
const chalk = require('chalk')
const Hapi = require('hapi')

process.env.API_NAME = require('../package.json').name

if (config.api.newRelic.enabled) {
  require('newrelic')
  console.info(chalk.bold('USING'), chalk.green('NEWRELIC'))
}

let serverOptions
if (config.api.env !== 'test') {
  serverOptions = {
    debug: {
      request: ['*']
    }
  }
}

const server = new Hapi.Server(serverOptions)

server.connection({
  host: config.api.host,
  port: config.api.port,
  routes: {
    cors: true
  }
})

require('./api/middlewares/preResponse')(server)
require('./api/middlewares/responseTime')(server)
require('./api/middlewares/authorization')(server)
require('./api/routes/routes')(server)
require('./api/databases/mongodb/connection')()

let plugins = [
  require('inert'),
  require('vision')
]

if (process.env.NODE_ENV.toLowerCase() !== 'production') {
  var swaggerConfig = require('./api/helpers/swagger/configuration.js')

  plugins.push(swaggerConfig.swaggered)
  plugins.push(swaggerConfig.swaggeredUi)
}

server.register(plugins, (err) => {
  if (err) { throw err } else if (!process.env.NODE_ENV) {
    let error = 'NODE_ENV not specified'
    console.error(chalk.red(error))
  } else {
    server.start(async (err) => {
      if (err) {
        console.error(chalk.red('error'), 'api fault: ' + err)
      } else {
        console.info('NODE_ENV:', chalk.green(process.env.NODE_ENV.toUpperCase()))
        console.info(chalk.bold('api is running'), server.info.protocol + ' server at: ' + chalk.green(server.info.uri))
      }
    })
  }
})

module.exports = server
