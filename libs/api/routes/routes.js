const swagger = require('../helpers/swagger')
const fs = require('fs')
const path = require('path')

function readDirR (dir) {
  return fs.statSync(dir).isDirectory()
    ? Array.prototype.concat(...fs.readdirSync(dir).map(f => readDirR(path.join(dir, f))))
    : dir
}

module.exports = (server) => {
  // loading default routes
  require('./healthCheck.js')(server, swagger)
  require('./notFound.js')(server)

  let resourcesPath = path.join(__dirname, '../../core')

  readDirR(resourcesPath).filter((file) => {
    return (file.indexOf('.routes.js') >= 0)
  }).forEach((file) => {
    require(path.resolve(file))(server, swagger)
  })
}
