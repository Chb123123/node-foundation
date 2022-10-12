const express = require('express')
const app = express()
const qs = require('querystring')

app.use(express.urlencoded({
  extended: false
}))

app.use((req, res, next) => {
  // 定义一个 字符串 专门用来接收客户端发送过来的数据请求体
  let str = ''
  // 监听 data 事件
  req.on('data', (data) => {
    str += data
  })
  // 监听 end 事件，将完整数据打印出来
  req.on('end', () => {
    const body = qs.parse(str)
    req.body = body
    // console.log(body)
  })
  next()
})

app.post('/', function(req, res) {
  console.log(req.body)
  res.send(req.body)
})

app.listen(80, function() {
  console.log('http://127.0.0.1')
})