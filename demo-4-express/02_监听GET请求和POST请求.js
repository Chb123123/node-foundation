const express = require('express')

const app = express()

// get 请求的语法
// 参数 1: 客户端请求的 url 地址
// 参数 2: 请求对应的处理函数
//      req: 请求对象(包含了请求相关的属性与方法)
//      res: 相应的对象(包含了与响应相关的属性和方法)
app.get('/user', function(req, res) {
  // 向客户端发送 JSON 数据
  res.send({
    name: '张三',
    age: 18,
    gender: '男'
  })
})

// post 请求的语法
app.post('/user', function(req, res) {
  res.send('post请求成功')
})

app.listen(80, function() {
  console.log('express is runing http://127.0.0.1')
})