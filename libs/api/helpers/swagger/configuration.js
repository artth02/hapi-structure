const pjson = require('../../../../package.json')
const config = require('config')

module.exports = {
  swaggered: {
    register: require('hapi-swaggered'),
    requiredtags: ['api'],
    options: {
      auth: false,
      info: {
        title: `Documentation ${pjson.name}`,
        description: `${pjson.name} back-end`,
        version: pjson.version
      },
      stripPrefix: config.api.basePath,
      tagging: {
        mode: 'tags'
      }
    }
  },
  swaggeredUi: {
    register: require('hapi-swaggered-ui'),
    swaggerOptions: {
      validatorUrl: null
    },
    options: {
      auth: false,
      authorization: {
        field: 'Authorization',
        scope: 'header',
        placeholder: 'Authorization token here'
      },
      title: pjson.description,
      path: '/documentation'
    },
    supportedMethod: ['GET', 'POST', 'PUT', 'DELETE', 'PATH']
  }
}
