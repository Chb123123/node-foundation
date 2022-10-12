const express = require('express')
const router = express.Router()

router.delete('/delete', function(req, res) {
  res.send('请求成功')
})

module.exports = router