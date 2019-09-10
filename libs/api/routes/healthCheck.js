const boom = require('boom')
const config = require('config')
const httpStatus = require('http-status')
const mongoose = require('mongoose')

module.exports = (server, swagger) => {
  server.route([{
    method: 'GET',
    path: `${config.api.basePath}/health`,
    config: {
      auth: false,
      handler: async (request, reply) => {
        const result = await mongoose.connection.db.command({ connectionStatus: 1, showPrivileges: true })
        if (!result.ok) {
          throw boom.serverUnavailable
        }

        reply({
          message: 'api is healthy',
          date: new Date()
        }).code(httpStatus.OK)
      },
      description: 'ping route.',
      notes: 'ping route',
      tags: ['api', 'Health Check'],
      plugins: swagger
        .document()
        .ok()
        .done()
    }
  }, {
    method: 'GET',
    path: `${config.api.basePath}/health/ping`,
    config: {
      auth: false,
      handler: async (request, reply) => {
        reply({
          message: 'api up',
          date: new Date()
        }).code(httpStatus.OK)
      },
      description: 'ping route.',
      notes: 'ping route',
      tags: ['api', 'Health Check'],
      plugins: swagger
        .document()
        .ok()
        .done()
    }
  }])
}
