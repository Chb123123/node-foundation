const date = require('./src/dateFomet')
const htmlesc = require('./src/htmlEsc')

module.exports = {
  ...date,
  ...htmlesc
}