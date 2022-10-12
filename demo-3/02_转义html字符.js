const http = require('http')
const chb = require('./chb-state')
const dateFormat = chb.dateEsc()
console.log(dateFormat)

const htmlStr = '<h1><span>老铁&nbsp;</span>标签</h1>'
const str1 = chb.htmlEsc(htmlStr)
console.log(str1)

const server = http.createServer()

server.on('request', function(req, res) {
  // console.log(req)
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end('当前请求地址为127.0.0.1')
})

server.listen(80, function() {
  console.log('server in runing http://127.0.0.1')
})