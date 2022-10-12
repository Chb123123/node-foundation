const qs = require('querystring')

const m1 = function(req, res, next) {
  let str = ''
  req.on('data', function(data) {
    str += data
  })

  req.on('end', function() {
    const body = qs.parse(str)
    req.body = body
  })
  next()
}

module.exports = m1
