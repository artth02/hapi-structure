const schemas = require('./schemas.js')

exports.document = () => {
  return {
    ok: ok,
    created: created,
    conflict: conflict,
    noContent: noContent,
    badRequest: badRequest,
    malformedRequestBody: malformedRequestBody,
    notFound: notFound,
    internal: internal,
    unauthorized: unauthorized,
    done: done,
    swaggerOptions: {}
  }
}

function ok (schema, description) {
  this.swaggerOptions['200'] = documentResponse(schema || schemas.defaultSchema, description || 'Ok')
  return this
}

function created (schema, description) {
  this.swaggerOptions['201'] = documentResponse(schema || schemas.defaultSchema, description || 'Created')
  return this
}

function noContent (schema, description) {
  this.swaggerOptions['204'] = documentResponse(schema || schemas.defaultSchema, description || 'No Content')
  return this
}

function badRequest (schema, description) {
  this.swaggerOptions['400'] = documentResponse(schema || schemas.badRequest, description || 'Bad Request')
  return this
}

function malformedRequestBody (schema, description) {
  this.swaggerOptions['400'] = documentResponse(schema || schemas.malformedRequestBody, description || 'Malformed Request Body')
  return this
}

function conflict (schema, description) {
  this.swaggerOptions['409'] = documentResponse(schema || schemas.conflict, description || 'Conflict')
  return this
}

function unauthorized (schema, description) {
  this.swaggerOptions['401'] = documentResponse(schema || schemas.unauthorized, description || 'Unauthorized')
  return this
}

function notFound (schema, description) {
  this.swaggerOptions['404'] = documentResponse(schema || schemas.recordNotFound, description || 'Record Not Found')
  return this
}

function internal (schema, description) {
  this.swaggerOptions['500'] = documentResponse(schema || schemas.internal, description || 'Internal Server Error')
  return this
}

function documentResponse (schema, description) {
  let document = { description }

  if (schema) { document.schema = schema }

  return document
}

function done () {
  return {
    'hapi-swaggered': {
      responses: this.swaggerOptions
    }
  }
}
