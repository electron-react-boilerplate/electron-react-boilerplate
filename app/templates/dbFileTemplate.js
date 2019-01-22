export default const dbFileTemplate = `const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const db = new Sequelize('${dialect}://${hostname}:${port}/${database}',
  {
    logging: false,
    operatorsAliases: false
  }
)
module.exports = db`
