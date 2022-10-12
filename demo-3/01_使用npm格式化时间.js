const http = require('http')
const monment = require('moment')

const server = http.createServer()

server.on('request', function(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  const dt = monment().format('YYYY-MM-DD HH:mm:ss')
  res.end(dt)
})

server.listen(80, function() {
  console.log('server in runing http://127.0.0.1')
})
