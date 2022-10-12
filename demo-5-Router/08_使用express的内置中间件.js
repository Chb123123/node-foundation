const express = require('express')
const app = express()

// 通过 express.json 解析json 格式的中间件
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', function(req, res) {
  console.log('请求')
  res.send("GET请求成功")
})

app.post('/', function(req, res) {
  console.log(req.body)
  res.send('POST请求成功' + req.body)
})

app.post('/book', function(req, res) {
  console.log(req.body)
  res.send( req.url + '请求成功')
})

app.listen(80, function() {
  console.log('http://127.0.0.1')
})