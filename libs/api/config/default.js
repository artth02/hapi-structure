const dotenv = require('dotenv')
const path = require('path')
const packageJson = require('../../../package.json')

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const envPath = path.join(__dirname, '/../../../.env-' + process.env.NODE_ENV)

try {
  dotenv.config({
    path: envPath
  })
} catch (err) {
  console.info(envPath + ' not found, load by environment variables')
}

module.exports = {
  api: {
    version: packageJson.version,
    basePath: process.env.API_BASE_PATH || 'v1/',
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    newRelic: {
      enabled: process.env.API_NEWRELIC_ENABLED === 'true'
    },
    auth: {
      requireAuthorization: process.env.API_AUTH_REQUIRE_AUTHORIZATION === 'true',
      certificate: process.env.API_AUTH_CERTIFICATE
    },
    log: {
      enabled: process.env.API_LOG_ENABLED === 'true'
    },
    db: {
      mongo: {
        user: process.env.API_DB_MONGO_USER,
        password: process.env.API_DB_MONGO_PASSWORD,
        host: process.env.API_DB_MONGO_HOST
      }
    }
  }
}
