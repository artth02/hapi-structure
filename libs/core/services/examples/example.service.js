const anotherExampleRepository = require('../anotherExample/anotherExamples.repository')

/**
 * Method: Retrieve examples that match filters
 * @param {{id: Number, name:String}} query
 */
async function get(query) {
  let result
  if (query.id) {
    result = await anotherExampleRepository.getById(query.id)
  } else {
    result = await anotherExampleRepository.filterByName(query.name)
  }

  return result
}

module.exports = {
  get: get
}
