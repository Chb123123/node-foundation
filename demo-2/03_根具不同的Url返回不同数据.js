const http = require('http')

const server = http.createServer()
server.on('request', function(req, res) {
  // const data = `当前请求的url地址为: ${req.url}, 请求类型为: ${req.method}`
  let content = '404 not found!'
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // console.log(req)
  // res.end(data)
  if(req.url === '/' || req.url === 'index.html') {
    content = '<h1>首页</h1>'
  } else if(req.url === '/about.html') {
    content = '<h3>详情页</h3>'
  }
  res.end(content)
})
server.listen(80, function() {
  console.log('server is http://127.0.0.1')
})