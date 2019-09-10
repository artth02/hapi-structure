const boom = require('boom')
module.exports = (server) => {
  server.route({
    method: '*',
    path: '/{p*}',
    config: {
      handler: async (request, reply) => {
        throw boom.notFound('Not Found - we know nothing about this route')
      }
    }
  })
}
