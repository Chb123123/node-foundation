const db = require('../mysqlFrom/index')
// const bcrypt = require('bcryptjs')
// 注册路由模块
exports.reguser = (req, res) => {
  const userItem = req.body
  // console.log(userItem.username)
  if(userItem.username === '' || userItem.password === '') return res.send({
    status: 400,
    message: '用户名或密码不能为空'
  })
  
  // const sqlStr = 'select * from userInfo'
  const sqlStr = 'select * from userInfo where username = ?'
  db.query(sqlStr, [userItem.username], function(err, results) {
    // 数据库执行失败
    if(err) return console.log(err.message)
    // 如果查询到了相同的用户名，返回用户名已占用
    console.log(results)
    if(results.length > 0) {
      return res.send({
        status: 400,
        message: '用户名已占用，请使用其他名称'
      })
    }
    // 当用户注册的用户名不存在时，将用户的用户名存储在数据库内
    const addUser = 'insert into userInfo set ?'
    db.query(addUser, { username: userItem.username, password: userItem.password }, (err, results) => {
      // 当插入数据发送错误时，返回失败相应数据
      if(err) return res.send({
        status: 0,
        message: err.message
      })
      // console.log(results)
      // 当影响的行数不为为 1 时，显示插入数据失败
      if(results.affectedRows !== 1) {
        res.send({
          status: 500,
          message: '用户注册失败，请稍后重试！'
        })
      }
      // 当影响行数为 1 时，将插入的数据返回
      res.send({
        status: 200,
        message: '用户注册成功',
        data: results
      })
    })
  })
}

/**
 * @api {post} /api/reguser 用户注册接口
 * @apiName requser
 * @apiGroup User
 *
 * @apiParam {String} username 注册的用户名
 * @apiParam {String} password 注册登入的密码
 *
 * @apiSuccess {Number} status 接口返回的状态码 200 表示操作成功
 * @apiSuccess {String} message  返回的说明详情
*/

// 登入的处理函数
exports.login = (req, res) => {
  // 接收用户登入的信息
  const user = req.body
  // user.password = bcrypt.hashSync(user.password, 10)
  console.log(user)
  const sqlStr = 'select * from userInfo where id = ?'
  db.query(sqlStr, user.id, function(err, results) {
    if(err) return res.send({
      status: 400,
      message: '登入失败，请稍后重试!'
    })
    // console.log(results[0].username)
    if(results.length > 0) {
      if(results[0].username == user.username && results[0].password == user.password) {
        res.send({
          status: 200,
          message: '登入成功'
        })
      } else {
        res.send({
          status: 400,
          message: '用户名或密码错误！请重新输入'
        })
      }
    } else {
      res.send({
        status: 400,
        message: '用户不存在'
      })
    }
  })
  
}

/**
 * @api {post} /api/login 用户登入接口
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {Number} id 用户名id
 * @apiParam {String} username 登入的用户名
 * @apiParam {String} password 登入的密码
 *
 * @apiSuccess {Number} id 用户的id
 * @apiSuccess {String} message  返回的说明详情
*/


// 获取用户详情
exports.getUsers = (req, res) => {
  const limit = req.query
  console.log(limit)
  const sqlStr = 'select * from userInfo limit ?, ?'
  // req.query 内的数据类型为 str 类型 需要将他们转化为 数字型才能正常执行
  db.query(sqlStr, [parseInt(limit.page), parseInt(limit.size)], (err, results) => {
    if(err) return res.send({
      statua: 0,
      message: '获取用户列表失败'
    })
    res.send({
      status: 200,
      message: '获取数据成功',
      data: results
    })
  })
}

/**
 * @api {get} /api/getUsers 获取用户列表
 * @apiname getUsers
 * @apiGroup User
 * 
 * @apiParam {Number} page 开始的条数
 * @apiParam {Number} size 获取的条数
 * 
 * @apiSuccess {Number} status 返回的状态码
 * @apiSuccess {String} message 返回的接口介绍
 * @apiSuccess {Array} data 返回的数据
*/