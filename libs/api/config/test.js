const packageJson = require('../../../package.json')

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'test'

module.exports = {
  api: {
    version: packageJson.version,
    basePath: '/v1/api',
    env: process.env.NODE_ENV,
    port: 9000,
    newRelic: {
      enabled: false
    },
    auth: {
      requireAuthorization: false,
      certificate: ''
    },
    log: {
      enabled: false
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
