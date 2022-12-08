const express = require('express')
const app = express()
const joi = require('joi')
const cors = require('cors')

// 解析 token 字符串
const config = require('./src/config')
const expressJWT= require('express-jwt')

app.use(cors())
const bodyParser = require('body-parser')
// 解析 axios 发送过来的 data 内的数据
app.use(bodyParser.json({extended:false}))
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

// 使用 .unless() 指定哪些接口不需要 就行token 验证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
// 导入并使用 router 模块
const loginRouter = require('./src/router/login')
const userRouter = require('./src/router/user') // 获取用户模块
const bookRouter = require('./src/router/bookClass') // 图书分类模块
const articleRouter = require('./src/router/article') // 文章详情模块
// const { UnauthorizedError } = require('express-jwt')
app.use('/api', loginRouter, bookRouter, articleRouter)
app.use('/my', userRouter)




// 错误中间件
app.use((err, req, res, next) => {
  // 表单验证失败
  if(err instanceof joi.ValidationError) return res.cc(err, 400)
  if(err.name === 'UnauthorizedError') return res.cc('token认证失败', 400)
  if(err) return res.cc(err, 400)
  console.log(err)
})

app.listen(80, function() {
  console.log('http://127.0.0.1')
})
