const express = require('express')
const router = express.Router()
// const bodyParser = require('body-parser') // 引入中间件

// const jsonParser = bodyParser.json({extended:false})

const articleInfo = require('../router_handler/article')

// 获取发布的文章
router.get('/getArticles', articleInfo.getArticle)

// 发布文章
router.post('/releaseArticle', articleInfo.releaseArticle)

// 通过标签获取文章列表
router.get('/getArticleClassification', articleInfo.getArticleClassification)

// 修改用户发布的内容
router.post('/updateArticle', articleInfo.updateArticle)

// 删除用户发布的文章
router.post('/reMoveArticle', articleInfo.reMoveArticle)

// 获取王者荣耀图片
router.get('/getImages', articleInfo.getImages)

module.exports = router
