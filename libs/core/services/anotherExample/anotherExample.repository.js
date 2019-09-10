const anotherExampleModel = require('./anotherExample.model')()
/**
 * Method: get all anoteherExamples that match the filter
 * @param  {Number} id - anotherExample id.
 */
async function getById(id) {
  return anotherExampleModel.findOne(id)
}

/**
 * Filter anotherExamples by name
 * @param {String} name - Name to filter
 */
async function filterByName(name) {
  return anotherExampleModel.filterByName(name)
}

module.exports = {
  getById,
  filterByName
}
