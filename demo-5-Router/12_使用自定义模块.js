const express = require('express')
const m1 = require('./11_封装自定义模块')


const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(m1)

app.post('/', function(req, res) {
  console.log(req.body)
  res.send(req.body)
})

app.listen(80, function() {
  console.log('http://127.0.0.1')
})
