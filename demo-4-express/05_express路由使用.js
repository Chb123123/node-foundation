const express = require('express')

const app = express()

app.get('/', function(req, res) {
  res.send('请求成功，请求类型为GET请求')
})

app.post('/', function(req, res) {
  res.send('请求成功，请求类型为 post 请求')
})

app.listen(80, function() {
  console.log('express server in http://127.0.0.1')
})