const moment = require('moment')
function dateEsc () {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {
  dateEsc
}