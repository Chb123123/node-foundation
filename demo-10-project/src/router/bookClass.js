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

// 获取商品信息
router.get('/getGoods', bookInfo.getGoods)

// 修改商品选中状态
router.post('/updateCheck', bookInfo.upDateCheck) 

// 修改商品数量
router.post('/updateCount', bookInfo.upDateCount) 

// 全选状态更改
router.post('/selectList', bookInfo.selectAll)

// Table 案例 商品列表
router.get('/getTableInfo', bookInfo.getTableInfo)

// 自定义商品标签
router.post('/custom', bookInfo.custom)

module.exports = router
