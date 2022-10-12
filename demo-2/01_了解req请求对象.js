const http = require('http')

const server = http.createServer()

server.on('request', function(req, res) {
  const str = `数据请求类型为${req.method}, 请求地址为${req.url}`
  console.log(str)
  // 为了防止中文乱码的问题，需要设置响应头 Content-type 
  res.setHeader('Content-Type', 'text/html: charset=utf-8')
  // res.end()
  // 向客户端发起指定的内容， 并结束这次的请求处理过程
  res.end(str)
})

server.listen(80, function() {
  console.log('http server runing at http:127.0.0.1:80')
})