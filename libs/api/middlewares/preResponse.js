const circularJson = require('circular-json')

function onPreResponse (server) {
  server.ext('onPreResponse', function (request, reply) {
    let response = request.response
    let genericalMessage = {
      '401': 'Unauthorized',
      '400': 'Bad Request.',
      '404': 'Not Found.',
      '500': 'Internal Server Error.',
      '503': 'Service unavailable.'
    }

    if (response.isBoom) {
      response.output.payload.moreInfo = {
        message: (response.data && response.data.name === 'ValidationError') ? response.output.payload.message : response.message,
        validation: response.output.payload.validation
      }

      response.output.payload.message = genericalMessage[response.output.payload.statusCode]

      delete response.output.payload.error
      delete response.output.payload.validation
    } else {
      if (response.source && request.response.headers['content-type'] && request.response.headers['content-type'].indexOf('application/JSON') > -1) {
        response.source = circularJson.stringify(response.source, replaceUndefinedOrNull)
        response.source = circularJson.parse(response.source)
      }
    }

    return reply.continue()
  })
}

function replaceUndefinedOrNull (key, value) {
  if (value === null || value === undefined) {
    return undefined
  }

  return value
}

module.exports = onPreResponse
