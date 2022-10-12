const express = require('express')

// 导入路由模块
const mRouter = require('./02_router')

const app = express()

// 注册路由模块
// 添加统一前缀
app.use('/api', mRouter)

app.listen(80, function() {
  console.log('express is server in http://127.0.0.1')
})