const express = require('express')
const router = require('./02_编写GET接口')
const router1 = require('./03_编写POST接口')
const router2 = require('./04_编写delete接口')
// 解决跨域问题 插件
const cors = require('cors')
const app = express()

// 解决跨域的问题
app.use(cors())

app.use(express.urlencoded({ extended: false }))

app.use('/api', router, router1, router2)

app.listen(80, function() {
  console.log('http://127.0.0.1')
})