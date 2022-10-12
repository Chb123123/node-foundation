const express = require('express')
const router = express.Router()

// 将路由挂载到 router 身上
router.get('/', function(req, res) {
  res.send('请求成功 GET')
})

router.post('/', function(req, res) {
  res.send('请求成功 POST')
})


module.exports = router