const express = require('express')

const app = express()

// 定义一个最简单的中间件函数
const mv = function (req, res, next) {
  console.log('最简单的中间件函数')
  // 把流转关系转交给 下一个中间件或路由
  next()
}
app.use(mv)

app.get('/', function(req, res) {
  res.send('请求成功')
})

app.listen(80, function() {
  console.log('127.0.0.1')
})