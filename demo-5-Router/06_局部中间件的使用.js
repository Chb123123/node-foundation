const express = require('express')
const app = express()

const m1 = function(req, res, next) {
  console.log('局部中间件')
  next()
}

const m2 = function(req, res, next) {
  console.log('局部中间件m2')
  next()
}

app.get('/', m1, m2, function(req, res, next) {
  console.log('get请求成功')
  res.send('请求成功')
})



app.get('/user', function(req, res, next) {
  console.log('user请求成功')
  res.send('user请求成功')
})

app.listen(80, function() {
  console.log('http://127.0.0.1')
})