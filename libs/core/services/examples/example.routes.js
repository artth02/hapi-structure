const config = require('config')
const Joi = require('joi')
const contoller = require('./exemple.controller')

module.exports = (server, swagger) => {
  server.route([{
    method: 'GET',
    path: `${config.api.basePath}/examples/example`,
    config: {
      handler: contoller.get,
      validate: {
        query: Joi.object({
          'id': Joi.number().optional().example(666),
          'name': Joi.string().required(),
        })
      },
      description: 'Example.',
      notes: 'Service exemple route',
      tags: ['api', 'Services'],
      plugins: swagger
        .document()
        .ok()
        .done()
    }
  }])
}
