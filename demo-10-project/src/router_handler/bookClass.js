const db = require('../mysqlFrom')
const db1 = require('../mysqlFrom/goods')

// 获取图书分类
exports.getBookClass = (req, res) => {
  const sqlStr = 'select id, nameClass from book_class where status = 0'
  db.query(sqlStr, (err, results) => {
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
  // console.log(bookInfo)
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
  // console.log(className)
  const sqlStr = 'select * from book_class where nameClass = ? and status = 0'
  db.query(sqlStr, className.className, (err, results) => {
    if (err) return res.cc(err, 500)
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
 * @api {post} /api/upDateCount 修改商品数量
 * @apiName UpdateCount
 * @apiGroup Goods
 * 
 * @apiParam {Number} id 要修改的商品 id
 * @apiParam {Number} count 要修改的商品数量
 * 
 * @apiSuccess {Number} status 状态返回码
 * @apiSuccess {String} message 状态返回说明
*/

// 修改全选状态

exports.selectAll = (req, res) => {
  const statusList = req.body.goodsList
  // console.log(statusList)
  // 修改失败的商品列表
  let errList = []
  const sqlStr = 'update shopping_cart set check1 = ? where id = ?'
  // 循环修改列表内数据的状态
  for (let i = 0; i < statusList.length; i++) {
    db1.query(sqlStr, [parseInt(statusList[i].check), parseInt(statusList[i].id)], (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) {
        errList.push(statusList[i])
      }
    })
  }
  // console.log(errList)
  if(errList.length <= 0) return res.cc('修改状态成功', 200)
  res.send({
    status: 301,
    message: '修改状态失败',
    errList: errList
  })
}

/**
 * @api {post} /api/selectAll 修改全选状态
 * @apiName SelectAll
 * @apiGroup Goods
 * 
 * @apiParam {Array} goodsList 要切换的数组信息，示例：[{id: 1,check: 1},{id: 2,check: 1}]
 * 
 * @apiSuccess {Number} status 状态返回码
 * @apiSuccess {String} message 状态返回说明
 * 
*/


// 查询商品列表
exports.getTableInfo = (req, res) => {
  const sqlStr = 'select * from tableInfo where status = 1'
  db1.query(sqlStr, (err, results) => {
    if(err) return res.cc(err, 500)
    // 格式化自定义标签
    results.some(item => {
      if(item.label) {
        item.label = item.label.split(',')
      } else {
        item.label = []
      }
    })
    res.send({
      status: 200,
      message: '请求成功',
      queryData: results
    })
  })
}

/**
 * @api {get} /api/getTableInfo 查询商品列表
 * @apiName GetTableList
 * @apiGroup GoodsDemo
 * 
 * @apiSuccess {Number} status 请求状态码
 * @apiSuccess {String} message 请求说明
*/

// 自定义商品标签
exports.custom = (req, res) => {
  let info = req.body
  console.log(info.id)
  let label
  let sqlStr = 'SELECT label FROM tableInfo WHERE id = ?'
  db1.query(sqlStr, parseInt(info.id), (err, results) => {
    if(err) return res.cc(err, 500)
    if(results.length) {
      if(results[0].label) {
        label = results[0].label.split(',')
      } else {
        label = []
      }
    } else {
      return res.cc('商品不存在', 300)
    }
    label.push(info.label)
    label = label.join(',')
    const sqlStr1 = 'update tableInfo set label = ? where id = ?'
    db1.query(sqlStr1, [label, info.id], (err, results) => {
      if(err) return res.cc(err, 500)
      if(results.affectedRows !== 1) return res.cc('新增标签失败', 300)
      res.cc('新增标签成功', 200)
    })
  })
}

/**
 * @api {post} /api/custom 自定义商品标签
 * @apiName Custom
 * @apiGroup GoodsDemo
 * 
 * @apiParam {Number} id 商品 Id
 * @apiParam {String} label 商品标签
 * 
 * @apiSuccess {Numver} status 请求状态码
 * @apiSuccess {String} message 请求状态说明
*/

// 删除商品
exports.deleteItem = (req, res) => {
  const info = req.body
  const sqlStr = 'update tableInfo set status = 0 where id = ?'
  db1.query(sqlStr, parseInt(info.id), (err, results) => {
    if(err) return res.cc(err, 500)
    if(results.affectedRows !== 1) return res.cc('删除商品失败', 300)
    res.cc('删除商品成功', 200)
  })
}

/**
 * @api {POST} /api/deleteItem 删除商品接口
 * @apiName deleteItem
 * @apiGroup GoodsDemo
 * 
 * @apiParam {Number} id 商品对应id
 * 
 * @apiSuccess {Number} status 请求状态码
 * @apiSuccess {String} message 请求状态说明
*/

// 是否显示 input 元素
exports.updateInput = (req, res) => {
  const info = req.body
  // console.log(parseInt(info.status), parseInt(info.id))
  const sqlStr = 'UPDATE tableinfo SET showInput = ? WHERE id = ?'
  db1.query(sqlStr, [parseInt(info.status), parseInt(info.id)], (err, results) => {
    if(err) return res.cc(err, 500)
    if(results.affectedRows !== 1) return res.cc('修改状态失败！', 300)
    res.cc('修改状态成功', 200)
  })
}

/**
 * @api {POST} /api/updateInput 修改input 显示状态
 * @apiName updateStatus
 * @apiGroup GoodsDemo
 * 
 * @apiParam {Number} id 商品对应 Id
 * @apiParam {Number} status 商品对应输入框显示数据
 * 
 * @apiSuccess {Number} status 状态返回码
 * @apiSuccess {String} message 状态返回说明
*/



// 综合案例
// 获取表单请求数据

exports.getTableList = (req, res) => {
  const sql = 'select * from tableList where status = 1'
  db1.query(sql, (err, results) => {
    if(err) return res.cc(err)
    res.send({
      status: 200,
      message: '获取表单数据成功',
      queryData: results
    })
  })
}

/**
 * @api {get} /api/getTableList 获取表单数据
 * @apiName getTableList
 * @apiGroup synthesizeDemo
 * 
 * @apiSuccess {Number} status 返回的表单数据
 * @apiSuccess {String} message 返回的请求说明
*/

// 修改表单状态
exports.updateTableStatus = (req, res) => {
  const info = req.body
  const sql = 'update tableList set status = 0 where id = ?'
  db1.query(sql, parseInt(info.id), (err, results) => {
    if(err) return res.cc(err, 500)
    if(results.affectedRows !== 1) res.cc('修改状态失败', 300)
    res.cc('修改状态成功', 200)
  })
}

/**
 * @api {post} /api/updateTableStatus 修改表单状态
 * @apiName updateTableStatus
 * @apiGroup synthesizeDemo
 * 
 * @apiParam {Number} id 要删除的表单 id
 * 
 * @apiSuccess {Number} status 返回的请求状态
 * @apiSuccess {String} message 返回的请求说明
 * 
*/

// 新增表单数据

exports.addTableItem = (req, res) => {
  const info = req.body
  const sql = 'insert into tableList set name = ?, age = ?, title = ?, time = ?'
  db1.query(sql, [info.name, parseInt(info.age), info.title, info.time], (err, results) => {
    if(err) return res.cc(err, 500)
    if(results.affectedRows !== 1) return res.cc('新增数据失败', 300)
    res.cc('新增数据成功!', 200)
  })
}

/**
 * @api {post} /api/addTableItem 新增表单数据
 * @apiName addTableItem
 * @apiGroup synthesizeDemo
 * 
 * @apiParam {String} name 新增的用户名称
 * @apiParam {Number} age 新增的用户年龄
 * @apiParam {String} title 新增用户的头衔
 * @apiParam {String} time 用户注册时间
 * 
 * @apiSuccess {Number} status 接口返回状态
 * @apiSuccess {String} message 接口返回说明
*/
