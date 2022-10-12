const express = require('express')
const router = express.Router()

router.get('/user', function(req, res) {
  const query = req.query
  res.send({
    state: 200,
    message: '请求成功',
    data: query
  })
})

module.exports = router
