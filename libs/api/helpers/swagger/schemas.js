const Joi = require('joi')

let errorCodes = {
  internal: 10000,
  badRequest: 20001,
  malformedRequestBody: 20020,
  conflict: 20033,
  resourceNotFound: 20022,
  recordNotFound: 20023,
  unauthorized: 30001
}

const defaultSchema = Joi.object({
  developerMessage: Joi.string().required().example('A developer message'),
  userMessage: Joi.string().required().example('A user friendly message'),
  errorCode: Joi.number().integer().required().example(10000),
  moreInfo: Joi.object({
    message: Joi.string().required().example('child [field-name] fails because [[field-name] with value [value] fails to match the required pattern: [[some-regex]]]'),
    validation: Joi.object({
      source: Joi.string().required().example('query'),
      keys: Joi.array().items(Joi.string()).required().example(['some data'])
    }).required(),
    stack: Joi.object().optional()
  }).optional().label('error detail')
})

/**
 * Method: Returns the error schema
 * @param {*} developerMessage - Text to be displayed in developer message field;
 * @param {*} userMessage - Text to be displayed in user message field;
 * @param {*} errorCode - Apigee error code to be displayed in error code field;
 */
function schema (developerMessage, userMessage, errorCode) {
  return Joi.object().keys({
    developerMessage: Joi.string().example(developerMessage),
    userMessage: Joi.string().example(userMessage),
    errorCode: Joi.number().example(errorCode),
    moreInfo: Joi.string().example('http://www.developer.apiluiza.com.br/errors')
  })
}

module.exports = {
  default: defaultSchema,
  badRequest: schema('Missing query parameter "x"', 'Field "x" is required and can not be empty', errorCodes.badRequest),
  malformedRequestBody: schema('Malformed request body', 'Malformed request body', errorCodes.malformedRequestBody),
  conflict: schema('"record" already exists', 'You attempted to create "record", but already exists', errorCodes.conflict),
  unauthorized: schema('Unauthorized - make sure the header parameter Authorization is valid', 'You are not authorized to perform this operation', errorCodes.unauthorized),
  resourceNotFound: schema('Resource Not Found', 'You attempt to get a resource but did not find any', errorCodes.resourceNotFound),
  recordNotFound: schema('Record Not foud', 'You attempt to get a record but did not find any', errorCodes.recordNotFound),
  internal: schema('Internal server error', 'Was encountered an error when processing your request. We apologize for the inconvenience.', errorCodes.internal)
}
