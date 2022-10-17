const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const express = require('express')
const app = express()

const cors = require('cors')
const secretKey = 'chb nb'
app.use(expressJwt({ secret: secretKey }).unless({ path: [/^\/api\//] }))
app.use(cors())
app.use(express.urlencoded({ extended: false }))

// .unless({ path: [ /^/api\// ] }) 来指定哪些接口不需要访问权限





// 在登入成功后生成 JWT 字符串
// 登入接口
app.post('/api/login', function(req, res) {
  // 
  if(req.query.username !== 'admin' || req.query.password !== '123456') {
    return res.send({
      status: 400,
      message: '登入失败'
    })
  }
  // 在用户登入成功后 生成 JWT 字符串，通过token属性相应给 客户端
  // 调用 jwt.sign()生成 jwt 字符串, 三个参数分别是 用户信息对象, 加密密钥, 配置对象有效期
  const tokenStr = jwt.sign({ username: req.query.username }, secretKey, { expiresIn: '30s' })
  res.send({
    status: 200,
    message: '登入成功',
    
    token: tokenStr
  })
})

app.get('/admin/userinfo', (req, res) => {
  console.log(req.user)
  res.send({
    status: 200,
    message: '获取数据成功',
    data: req.user
  })
})
// 解密中间件  将 JWT 字符串解密为 json 对象

app.use((err, req, res, next) => {
  if(err.name == 'UnauthorizedError') {
    res.send('无效token')
  }
  res.send({
    status: 400,
    message: '未知错误'
  })
})

app.listen(80, function() {
  console.log('http://127.0.0.1')
})