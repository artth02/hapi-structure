const config = require('config')
const pJson = require('../../../../package.json')

/**
 * Method: log data in kibana
 * @param {Any} data Object to log
 */
function log (data) {
  if (data.env !== undefined) {
    data.app_env = data.env
    delete data.env
  }

  if (!data || !config.api.log.enabled || config.api.env === 'test') {
    return
  }

  let payload = {
    origin: `${pJson.name}-v2`,
    type: 'json'
  }

  payload[pJson.name] = data

  console.info(payload)
}

module.exports = {
  log: log
}
