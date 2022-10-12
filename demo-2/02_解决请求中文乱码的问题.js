const http = require('http')

const server = http.createServer()
server.on('request', function(req, res) {
  const str = `当前请求的url为: ${req.url}, 请求类型为：${req.method}`
  console.log(str)
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(str)
})

server.listen(80, function() {
  console.log('server is http://127.0.0.1')
})