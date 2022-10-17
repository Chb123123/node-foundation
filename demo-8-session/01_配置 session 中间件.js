const express = require('express')
const session = require('express-session')
const cors = require('cors')
const app = express()
// 配置 session 中间件

app.use(cors())

app.use(session({
  secret: 'keyboard cat', // secret 属性的值可以为任意字符串
  resave: false, // 固定写法
  saveUninitialized: true // 固定写法
}))
app.use(express.urlencoded({ extended: false }))
app.post('/api/login', (req, res) => {
  // console.log(req.query)
  if(req.query.username !== 'admin' || req.query.password !== '123456') {
    return res.send({ status: 1, message: '登入失败' })
  }

  req.session.user = req.query // 将用户的信息、存储到 session 中
  req.session.islogin = true // 将用户登入的状态存储到 session 中
  console.log(req.session)
  res.send({ status: 0, message: '登入成功' })
})

// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  console.log(req.session)
  if(!req.session.islogin) {
    return res.send({ status: 0, messaeg: 'fail' })
  }
  res.send({
    status: 1,
    message: 'true',
    // username: req.session.user.username
  })
})

// 退出登入
app.post('/api/loginOut', (req, res) => {
  req.session.destroy()
  res.send({
    status: 0,
    message: '退出登入成功'
  })
})

app.use((err, req, res, next) => {
  console.log('发生了错误' + err.message)
  console.log(req.body)
  res.send('Error' + err.message)
})

app.listen(80, function() {
  console.log('http://127.0.0.1')
})