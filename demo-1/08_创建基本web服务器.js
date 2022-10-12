const http = require('http')

// 创建 web 服务器实例
// 调用 http.createSever() 方法 
const server = http.createServer()

// 使用 serve.on 方法为服务器绑定一个 request 事件
server.on('request', function(req, res) {
  // 只要有客户端请求服务器，就会触发 request 事件，从而调用这个事件的处理函数
  // console.log('someone visit our server.')
  // req 是请求对象，它包含了与客户端相关的数据和属性
  // req.url 是客户端请求的 url 地址
  // req.method 是客户端请求的请求类型
  const str = `You request url is ${req.url}, and request method is ${req.method}`
  console.log(str)
})

// 启动服务器
server.listen(80, function() {
  console.log('http server runing at http://127.0.0.1')
})