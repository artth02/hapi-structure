const logger = require('../helpers/log/log.js')
const circularJSON = require('circular-json')

module.exports = (server) => {
  server.ext('onRequest', (request, reply) => {
    logger.log({
      api: {
        method: request.method,
        url: request.url ? request.url.href : circularJSON.stringify(request.url),
        payload: request.payload,
        headers: request.headers
      },
      type: 'api-request'
    })
    request.headers['x-req-start'] = (new Date()).getTime()
    reply.continue()
  })

  server.ext('onPreResponse', (request, reply) => {
    logger.log({
      api: {
        method: request.method,
        status: request.response.output ? request.response.output.statusCode : 0,
        url: request.url ? request.url.href : circularJSON.stringify(request.url),
        payload: request.response.output ? request.response.output.payload : {},
        headers: request.headers
      },
      type: 'api-response'
    })
    var start = parseInt(request.headers['x-req-start'])
    var end = (new Date()).getTime()
    if (!request.response.isBoom) {
      request.response
        .header('x-req-start', start)
        .header('x-res-end', end)
        .header('x-response-time', end - start)
    }
    reply.continue()
  })
}
