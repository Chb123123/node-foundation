const db = require('../mysqlFrom')
const db1 = require('../mysqlFrom/goods')

// 获取图书分类
exports.getBookClass = (req, res) => {
  const sqlStr = 'select id, nameClass from book_class where status = 0'
  db.query(sqlStr, (err, results) => {
    // if(err) return res.send({
    //   status: 500,
    //   message: '请稍后重试！'
    // })
    if(err) return res.cc('请稍后重试', 500)
    res.send({
      status: 200,
      message: '请求成功',
      data: results
    })
  })
}

/**
 * @api {get} /api/getBookClass 获取图书分类
 * @apiName getBookClass
 * @apiGroup Book
 * 
 * @apiSuccess {Number} status 状态码 200 表示请求成功
 * @apiSuccess {String} message 请求说明
 * @apiSuccess {Array} data 返回的图书分类
*/

// 新增图书分类
exports.addBookClass = (req, res) => {
  const bookInfo = req.query
  console.log(bookInfo)
  const sqlStr1 = 'select * from book_class where nameClass = ? and status = 0'
  db.query(sqlStr1, bookInfo.className, (err, results) => {
    if(err) return res.cc(err, 500)
    if(results.length > 0) {
      return res.cc('类名已存在', 300)
    }
    const sqlStr = 'insert into book_class set nameClass = ?'
    db.query(sqlStr, bookInfo.className, (err, results) => {
    if(err) return res.cc('请稍后重试', 500)
    if(results.affectedRows === 1) {
      return res.send({
        status: 200,
        message: '添加类名成功'
      })
    }
    res.cc('添加图书失败', 400)
  })
  })
}

/**
 * @api {post} /api/addBookClass 添加图书类名
 * @apiName addBookClass
 * @apiGroup Book
 * 
 * @apiParam {String} className 图书类名
 * 
 * @apiSuccess {Number} status 请求状态码 200 表示请求成功
 * @apiSuccess {String} message 请求说明
*/

// 更改文章分类
exports.upDateClass = (req, res) => {
  const className = req.query
  // 判断是否有输入的类名
  console.log(className)
  const sqlStr = 'select * from book_class where nameClass = ? and status = 0'
  db.query(sqlStr, className.className, (err, results) => {
    if (err) return res.cc(err, 600)
    if(results.length !== 0) return res.cc('文章类名已存在，请重新输入', 400)
    const sqlStr1 = 'update book_class set nameClass = ? where id = ? and status = 0'
    db.query(sqlStr1, [className.className, parseInt(className.id)], (err, results) => {
      if(err) return res.cc(err, 500)
      if(results.affectedRows === 1) {
        return res.send({
          status: 200,
          message: '类名更改成功'
        })
      }
      res.send({
        status: 400,
        message: '类名更改失败，请稍后重试！'
      })
    })
  })
}

/**
 * @api {post} /api/updateclass 更改图书类名
 * @apiName updateBookClass
 * @apiGroup Book
 * 
 * @apiParam {String} className 更改后的图书类名
 * @apiParam {Number} id 要更改的图书ID
 * 
 * @apiSuccess {Number} status 返回的状态码
 * @apiSuccess {String} message 请求说明
*/

// 删除图书类名
exports.reMoveClass = (req, res) => {
  const bookInfo = req.query
  const findData = 'select * from book_class where id = ? and status = 0'
  db.query(findData, bookInfo.id, (err, results) => {
    if(err) return res.cc(err, 500)
    const sqlStr = 'update book_class set status = 1 where id = ? and status = 0'
    db.query(sqlStr, bookInfo.id, (err, results) => {
      if(err) return res.cc(err, 500)
      if(results.affectedRows == 1) {
        return res.send({
          status: 200,
          message: '删除图书类名成功'
        })
      } 
      res.cc('删除图书类名失败，请稍后重试', 400)
    })
  })
}

/**
 * @api {post} /api/removeClass 删除图书类名
 * @apiName removeClass 
 * @apiGroup Book
 * 
 * @apiParam {Number} id 图书类名id
 * 
 * @apiSuccess {Number} status 请求状态码
 * @apiSuccess {String} message 请求描述
*/


// 获取商品信息
exports.getGoods = (req, res) => {
  const sqlStr = 'select * from shopping_cart'
  db1.query(sqlStr, (err, results) => {
    if(err) return res.cc(err, 300)
    res.send({
      status: 200,
      message: '获取数据成功',
      queryData: results
    })
  })
}

/**
 * @api {get} /api/getGoods 获取商品信息
 * @apiName getGoods
 * @apiGroup Goods
 * 
 * @apiSuccess {Number} status 请求码
 * @apiSuccess {String} message 请求说明
 * @apiSuccess {Array} queryData 返回的数据
*/

// 修改商品状态
exports.upDateCheck = (req, res) => {
  const info = req.body
  // console.log(parseInt(info.check))
  if(parseInt(info.check) === 1 || parseInt(info.check) === 0) {
    const sqlStr = 'update shopping_cart set check1 = ? where id = ?'
    db1.query(sqlStr, [parseInt(info.check), parseInt(info.id)], (err, results) => {
    if(err) return res.cc(err, 500)
    if(results.affectedRows !== 1) return res.cc('修改状态失败', 500)
    res.cc('修改状态成功', 200)
  })
  } else {
    return res.cc('状态格式错误', 300)
  }
  
}

/**
 * @api {post} /api/updateCheck 修改商品选中状态
 * @apiName UpdateCheck
 * @apiGroup Goods
 * 
 * @apiParam {Number} id 要修改的商品 id
 * @apiParam {Number} check 要修改的商品状态 1 选中 0 未选中
 * 
 * @apiSuccess {Number} status 状态返回码
 * @apiSuccess {String} message 状态返回说明
*/

// 修改商品数量
exports.upDateCount = (req, res) => {
  const info = req.body
  if(info.count < 0) return res.cc('商品数量不能小于0', 300)
  const sqlStr = 'update shopping_cart set count = ? where id = ?'
  db1.query(sqlStr, [parseInt(info.count), parseInt(info.id)], (err, results) => {
    if(err) return res.cc(err, 500)
    if(results.affectedRows !== 1) return res.cc('修改数量失败', 500)
    res.cc('修改数量成功', 200)
  })
}

/**
 * @api {post} /api/upDateCount 修改商品选中状态
 * @apiName UpdateCount
 * @apiGroup Goods
 * 
 * @apiParam {Number} id 要修改的商品 id
 * @apiParam {Number} count 要修改的商品数量
 * 
 * @apiSuccess {Number} status 状态返回码
 * @apiSuccess {String} message 状态返回说明
*/