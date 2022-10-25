const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: false }))
// 共享本地图片
app.use('/image', express.static('./src/imageWZ'))

// 在路由之前 封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值为 300 表示失败的情况
  // err 表示一个失败的对象，可能是一个失败的情况，也可能是一个错误的描述信息
  res.cc = function(err, status = 300) {
    res.send({
      status,
      message: err instanceof Error? err.message:err
    })
  }
  next()
})
// 导入并使用 router 模块
const userRouter = require('./src/router/user')
const bookRouter = require('./src/router/bookClass')
const articleRouter = require('./src/router/article')
app.use('/api', userRouter, bookRouter,articleRouter)


// 错误中间件
app.use((err, req, res, next) => {
  if(err) return console.log(err.message)
  console.log(err)
})

app.listen(80, function() {
  console.log('http://127.0.0.1')
})