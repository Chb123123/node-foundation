const fs = require('fs')
const path = require('path')
const http = require('http')

const server = http.createServer()
const pathUrl = (path.join(__dirname, '/资源文件/index.html'))
server.on('request', function(req, res) {
  let data = '<h1>404 Not fond!</h1>'
  const url = req.url
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  fs.readFile(pathUrl, 'utf-8', function(err, dataStr) {
    if(err) {
      console.log('获取文件失败')
      return
    }
    if(url === '/' || url === 'index.html') {
      res.end(dataStr)
    } else if(url === '/about') {
      data = '<h1>详情页</h1>'
      res.end(data)
    }
    // console.log(dataStr)
  })
  
})

server.listen(80, function() {
  console.log('server is runing http://127.0.0.1:80')
})