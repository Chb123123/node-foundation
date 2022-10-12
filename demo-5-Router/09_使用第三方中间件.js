const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.urlencoded({
  extended: false
}))


app.post('/', function(req, res) {
  console.log(req.body)
  res.send('请求成功')
})

app.listen(80, function() {
  console.log('http://127.0.0.1')
})