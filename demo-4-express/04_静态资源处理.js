const express = require('express')

const app = express()

// 挂载路径前缀
app.use('/news', express.static("./新闻"))
app.use('/', express.static('./立雪杯比赛'))
// express.static 提供静态资源服务
app.get('/', function(req, res) {
  res.send(req.query)
})

app.listen(80, function() {
  console.log('express is runing http://127.0.0.1')
})