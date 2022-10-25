const express = require('express')
const router = express.Router()

const bookInfo = require('../router_handler/bookClass')
// 获取图书分类
router.get('/getBookClass', bookInfo.getBookClass)

// 新增图书类名
router.post('/addBookClass', bookInfo.addBookClass)

// 更改图书类名
router.post('/updateclass', bookInfo.upDateClass)

// 删除图书类名
router.post('/removeClass', bookInfo.reMoveClass)

module.exports = router
