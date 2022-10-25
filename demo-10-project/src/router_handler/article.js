const db = require('../mysqlFrom')

// 查询发布的文章
exports.getArticle = (req, res) => {
  const articleCount = req.query
  const sqlStr = 'select id, article_title, article_body, article_Type from user_article where status = 0 and userId = ? limit ?, ?'
  db.query(sqlStr, [parseInt(articleCount.userId) ,parseInt(articleCount.page), parseInt(articleCount.size)], (err, results) => {
    if(err) return res.send(err, 500)
    res.send({
      status: 200,
      message: '查询文章成功',
      data: results
    })
  })
}

/**
 * @api {get} /api/getArticles 获取用户发布的所有文章
 * @apiName getArticle
 * @apiGroup Article
 * 
 * @apiParam {Number} userId 用户id
 * @apiParam {Number} page 请求数据开始的数字
 * @apiParam {Number} size 请求的数量
 * 
 * @apiSuccess {Number} status 请求状态码 200 表示请求数据成功
 * @apiSuccess {String} message 请求说明
 * @apiSuccess {Array} data 返回的数据
*/

// 发布文章
exports.releaseArticle = (req, res) => {
  const articleInfo = req.body
  // console.log(articleInfo)
  const sqlStr = 'select * from user_article where article_title = ?'
  db.query(sqlStr, articleInfo.articleTitle, (err, results) => {
    if(err) return res.cc(err, 500)
    if(results.length > 0) return res.send('文章标题冲突，请重试', 400)
    const sqlStr2 = 'select * from book_class where nameClass = ?'
    db.query(sqlStr2, articleInfo.articleType, (err, results) => {
      if(err) return res.cc(err, 500)
      if(results.length == 0) return res.cc('文章标题不存在，请重试', 400)

      // 满足条件时向数据库添加文章
      const sqlStr1 = 'insert into user_article set article_title = ?, article_body = ?, article_Type = ?, userId = ?'
      db.query(sqlStr1, [articleInfo.articleTitle, articleInfo.articleBody, articleInfo.articleType, articleInfo.userId], (err, results) => {
        if(err) return res.cc(err, 500)
        if(results.affectedRows === 1) return res.cc('发布文章成功', 200)
        res.cc('发布文章失败，请重试', 300)
      })
    })
    
  })
}

/**
 * @api {post} /api/releaseArticle 发布文章
 * @apiName releaseArticle
 * @apiGroup Article
 * 
 * @apiParam {Number} userId 发布用户的id
 * @apiParam {String} articleTitle 发布文章标题
 * @apiParam {String} articleBody 发布文章的内容
 * @apiParam {String} articleType 发布文章的标签
 * 
 * @apiSuccess {Number} status 请求状态码 200 表示请求数据成功
 * @apiSuccess {String} message 请求说明
*/


// 根据文章分类查询文章
exports.getArticleClassification = (req, res) => {
  const info = req.query
  // 判断文章标签是否存在
  const sqlStr1 = 'select * from book_class where nameClass = ?'
  db.query(sqlStr1, info.articleType, (err, results) => {
    if(err) return res.cc(err, 500)
    if(results.length === 0) return res.cc('文章标签不存在', 300)
    const sqlStr = 'select id, article_title, article_body, article_Type from user_article where article_Type = ? and userId = ? limit ?, ?'
    db.query(sqlStr, [info.articleType, info.userId, parseInt(info.page), parseInt(info.size)], (err, results) => {
      if(err) return res.cc(err, 500)
      res.send({
        status: 200,
        message: '获取文章列表成功',
        data: results
      })
    })
  })
  
}
/**
 * @api {get} /api/getArticleClassification 通过标签获取相应的文章
 * @apiName getArticleClassification
 * @apiGroup Article
 * 
 * @apiParam {Number} userId 发布文章用户id
 * @apiParam {String} articleType 文章标签
 * @apiParam {Number} page 获取文章的开始条数
 * @apiParam {Number} size 获取总条数
 * 
 * @apiSuccess {Number} status 请求状态码 200 表示请求数据成功
 * @apiSuccess {String} message 请求说明
 * @apiSuccess {Array} data 返回的文章数据
*/

// 删除发布的文章
