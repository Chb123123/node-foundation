// 导入 express 模块
const express = require('express')

// 创建 web 服务器
const app = express()

// 启动 web 服务器
app.listen(80, function() {
  console.log('express in runing http://127.0.0.1')
})