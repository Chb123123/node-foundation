const express = require('express')
const router = express.Router()

const articleInfo = require('../router_handler/article')

// 获取发布的文章
router.get('/getArticles', articleInfo.getArticle)

// 发布文章
router.post('/releaseArticle', articleInfo.releaseArticle)

// 通过标签获取文章列表
router.get('/getArticleClassification', articleInfo.getArticleClassification)

module.exports = router