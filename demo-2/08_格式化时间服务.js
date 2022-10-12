const http = require('http')
const server = http.createServer()

server.on('request', function(req, res) {
  const url = req.url
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  const timer = +new Date()
// console.log(timer)
// console.log(Math.floor(timer / 1000 % 60))
const m = Math.floor(timer / 1000 % 60) < 10? '0'+Math.floor(timer / 1000 % 60) : Math.floor(timer / 1000 % 60)

// console.log(Math.floor(timer /1000 / 60  % 60))
const f = Math.floor(timer /1000 / 60  % 60)< 10 ? '0' + Math.floor(timer /1000 / 60  % 60) : Math.floor(timer /1000 / 60  % 60)
// console.log(Math.floor(timer /1000 / 60  / 60 % 24) + 8)
const s = Math.floor(timer /1000 / 60  / 60 % 24) + 8 < 10 ? '0' + (Math.floor(timer /1000 / 60  / 60 % 24) + 8) : Math.floor(timer /1000 / 60  / 60 % 24) + 8
const newData = `当前时间：${s}:${f}:${m}`
// console.log(newData)
  res.end(newData)
})

server.listen(80, function() {
  console.log('server is runing http://127.0.0.1')
})