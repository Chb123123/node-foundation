const express = require('express')

const app = express()

// 定义一个最简单的中间件函数
app.use(function(req, res, next) {
  // 获取请求到达服务器的时间
  const times = +new Date()
  req.startTime = times
  next()
})

app.get('/', function(req, res) {
  console.log(req.startTime)
  res.send('newtimeL:' + req.startTime)
})

app.listen(80, function() {
  console.log('127.0.0.1')
})