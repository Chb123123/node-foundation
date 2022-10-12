const express = require('express')
const router = express.Router()


router.post('/post', function(req, res) {
  const query = req.body
  res.send({
    state: 200,
    message: '请求成功',
    data: query
  })
})

module.exports = router