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
// 解析 form-data 数据格式内的数据
app.use(express.urlencoded({ extended: false }))


// 共享本地图片 将图片访问地址修改为网络地址
// http://127.0.0.1/image/伽罗/伽罗-5.jpg 网络图片格式
app.use('/image', express.static('./src/imageWZ'))

// 在路由之前 封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值为 300 表示失败的情况
  // err 表示一个失败的对象，可能是一个失败的情况，也可能是一个错误的描述信息
  res.cc = function(err, status = 300) {
    res.send({
      // 传入的状态码
      status,
      // 判断错误是否为系统错误
      message: err instanceof Error? err.message:err
    })
  }
  next()
})

// 使用 .unless() 指定哪些接口不需要 就行token 验证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
// 导入并使用 router 模块
const loginRouter = require('./src/router/login')  // 登入组件
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
  // 判断是否是 token 认证失败
  if(err.name === 'UnauthorizedError') return res.cc('token认证失败', 400)
  // 未知错误
  if(err) return res.cc(err, 400)
  console.log(err)
})

app.listen(80, function() {
  console.log('server runing http://127.0.0.1')
})
