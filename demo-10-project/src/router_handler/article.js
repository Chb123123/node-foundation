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
  if(articleInfo.articleTitle !== '' && articleInfo.articleBody !== '') {
    // console.log(articleInfo)
  const sqlStr = 'select * from user_article where article_title = ?'
  db.query(sqlStr, articleInfo.articleTitle, (err, results) => {
    if(err) return res.cc(err, 600)
    if(results.length > 0) return res.cc('文章标题冲突，请重试', 400)
    const sqlStr2 = 'select * from book_class where nameClass = ?'
    db.query(sqlStr2, articleInfo.articleType, (err, results) => {
      if(err) return res.cc(err, 500)
      if(results.length == 0) return res.cc('文章标题不存在，请重试', 400)

      // 满足条件时向数据库添加文章
      const sqlStr1 = 'insert into user_article set article_title = ?, article_body = ?, article_Type = ?, userId = ?'
      db.query(sqlStr1, [articleInfo.articleTitle, articleInfo.articleBody, articleInfo.articleType, parseInt(articleInfo.userId)], (err, results) => {
        if(err) return res.cc(err, 500)
        if(results.affectedRows === 1) return res.cc('发布文章成功', 200)
        res.cc('发布文章失败，请重试', 300)
      })
    })
    
  })
  } else {
    res.cc('文章标题或文字内容不允许为空', 300)
  }
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

// 修改发布的文章内容
exports.updateArticle = (req, res) => {
  // 携带的参数
  const content = req.body
  if(content.articleTitle !== '' && content.articleTitle !== '') {
    const sqlStr = 'update from user_article set article_title = ?, article_body = ? where id = ? and userid = ? and status = 0'
    db.query(sqlStr, [], (err, results) => {
      if(err) return res.cc(err, 500)
      if(results.affectedRows !== 1) {
        return res.cc('修改文章失败，请重试', 300)
      }
      res.cc('修改文章成功', 200)
    })
  } else {
    res.cc('文章标题或文字内容不允许为空')
  }
}

/**
 * @api {post} /api/updateArticle 修改用户发布的文章
 * @apiName updateArticle
 * @apiGroup Article
 * 
 * @apiParam {Number} userId 用户id
 * @apiParam {Number} articleId 文章id
 * @apiParam {String} articleTitle 文章标题
 * @apiParam {String} articleContent 文章内容
 * 
 * @apiSuccess {Number} status 请求状态 200: 成功
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
exports.reMoveArticle = (req, res) => {
  // 接收的参数 用户ID 文章ID
  const info = req.body
  const sqlStr = 'update user_article set status = 1 where userId = ? and id = ? and status = 0'
  db.query(sqlStr, [parseInt(info.userId), parseInt(info.articleId)], (err, results) => {
    if(err) return res.cc(err, 500)
    if(results.affectedRows !== 1) return res.cc('文章删除失败', 400)
    res.send({
      status: 200,
      message: '文章删除成功'
    })
  })
  
}

/**
 * @api {post} /api/reMoveArticle 删除用户发布的文章
 * @apiName reMoveArticle
 * @apiGroup Article
 * 
 * @apiParam {Number} userId 用户id
 * @apiParam {Number} articleId 文章id
 * 
 * @apiSuccess {Number} status  请求状态码 200 表示操作成功
 * @apiSuccess {String} message 请求详情说明
*/

// 查询王者荣耀英雄图片
exports.getImages = (req, res) => {
  const content = req.query
  if(content.page && content.size && content.name) {
    const sqlStr = 'select imageUrl, imageType from imageWZ where imageType = ? limit ?, ?'
    db.query(sqlStr, [content.name, parseInt(content.page), parseInt(content.size)], (err, results) => {
      if(err) return res.cc(err, 500)
      if(results.length == 0) {
        return res.cc('查询的英雄不存在', 300)
      }
      res.send({
        status: 200,
        message: '获取图片成功',
        data: results
      })
    })
  } else if(content.page && content.size) {
    // console.log(content)
    let sqlStr = 'select imageUrl, imageType from imageWZ limit ?, ?'
    db.query(sqlStr, [parseInt(content.page), parseInt(content.size)], (err, results) => {
      if(err) return res.cc(err)
      if(results.length == 0) return res.cc('图片不存在')
      res.send({
        status: 200,
        message: '图片查询成功',
        data: results
      })
    })
  } else if(content.name) {
    const sqlStr = 'select imageUrl, imageType from imageWZ where imageType = ?'
    db.query(sqlStr, content.name, (err, results) => {
      if(err) return res.cc(err, 500)
      if(results.length == 0) {
        return res.cc('查询的英雄不存在', 300)
      }
      res.send({
        status: 200,
        message: '获取图片成功',
        data: results
      })
    })
  } else {
    const sqlStr = 'select imageUrl, imageType from imageWZ'
    db.query(sqlStr, (err, results) => {
      if(err) return res.cc(err, 500)
      res.send({
        status: 200,
        message: '请求成功',
        data: results
      })
    })
  }
  
}

/**
 * @api {get} /api/getImages 获取王者荣耀英雄图片
 * @apiName getImages
 * @apiGroup Image
 * 
 * @apiParam {String} [name] 英雄名称
 * @apiParam {Number} [page] 开始条数
 * @apiParam {Number} [size] 图片总数
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 请求信息
 * @apiSuccess {Array} data 响应的图片
*/
