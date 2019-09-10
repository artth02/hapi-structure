const httpStatus = require('http-status')
const exampleService = require('./example.service')

/**
  * Method: get given plan costs
  * @param {Object} request - client Request
  * @param {Object} reply - client Response
  */
async function get (request, reply) {
  const result = await exampleService.get(request.query)

  reply(result).code(httpStatus.OK)
}

module.exports = {
  get: get
}
