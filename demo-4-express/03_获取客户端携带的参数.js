const express = require('express')

const app = express()

// app.get('/user', function(req, res) {
//   // req.query 默认是一个空对象
//   // 客户端使用 ?name=zz&age=20 这种查询字符串形式发送到服务器
//   // 可以通过 req.query 对象访问到
//   // 例如： req.query.name 或 req.query.age
//   console.log(req.query)
//   res.send({
//     name: '张三'
//   })
// })

// 获取 url 中的动态参数
// URL 地址中， 可以通过 : 参数名的形式匹配动态参数值
app.get('/:id/:name', function(req, res) {
  // req.params 默认是一个空对象
  // 里面存放着通过 : 动态匹配到的参数值
  console.log(req.params)
  res.send(req.params)
})

app.listen(80, function() {
  console.log('express in runing http://127.0.0.1' )
})