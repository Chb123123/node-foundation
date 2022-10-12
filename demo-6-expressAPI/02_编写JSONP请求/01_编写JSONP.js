const express = require('express')
const app = express()

app.get('/api/jsonp', function(req, res){
  // 获取客户端发送过来的回调函数名称
  const funcName = req.query.callback
  // 得到要通过的 JSONP 形式发送给客户端的数据
  const data = { name: '张三', age: 22 }
  // 根据前两步得到的数据，拼接一个函数调用的字符串
  const scriptStr = `${funcName}(${JSON.stringify(data)})`
  // 把上一步拼接的字符串，响应给客户端的 <script>标签进行解析执行
  res.send(scriptStr)
})

app.listen(80, function() {
  console.log('http://127.0.0.1')
})