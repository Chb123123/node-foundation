const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: false }))

// 导入并使用 router 模块
const userRouter = require('./src/router/user')
app.use('/api', userRouter)


// 错误中间件
app.use((err, req, res, next) => {
  if(err) return console.log(err.message)
  console.log(err)
})

app.listen(80, function() {
  console.log('http://127.0.0.1')
})