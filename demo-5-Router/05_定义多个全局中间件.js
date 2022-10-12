const express = require('express')

const app = express()

// 定义一个最简单的中间件函数
app.use(function(req, res, next) {
  console.log('第一个中间件')
  next()
})

app.use((req, res, next) => {
  console.log('第二个中间件')
  next()
})

app.get('/', function(req, res) {
  // console.log(req.startTime)
  res.send('请求成功')
})

app.listen(80, function() {
  console.log('127.0.0.1')
})