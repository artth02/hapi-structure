const config = require('config')
const jwt = require('jsonwebtoken')
const boom = require('boom')
const cert = config.api.auth.certificate

/**
 * Method: authentication function
 * @param {*} hapiServer - Hapi Server
 */
function authentication (hapiServer) {
  const scheme = function (server, options) {
    return {
      authenticate: async function (request, reply) {
        const authorization = request.headers.authorization
        if (!authorization) {
          reply(boom.unauthorized('unexistent header parameter authorization'))
        } else {
          try {
            const decoded = await jwt.verify(authorization, cert, {algorithms: ['HS256']})
            return reply.continue({ credentials: decoded })
          } catch (err) {
            reply(boom.unauthorized())
          }
        }
      }
    }
  }

  if (config.api.auth.requireAuthorization) {
    hapiServer.auth.scheme('custom', scheme)
    hapiServer.auth.strategy('default', 'custom')
    hapiServer.auth.default('default', 'mode')
  }
}

module.exports = authentication
