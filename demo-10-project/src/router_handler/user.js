const db = require('../mysqlFrom/index')
const bcrypt = require('bcryptjs')

// 生成token 的包
const jwt = require('jsonwebtoken')
const config = require('../config')
// 注册路由模块
exports.reguser = (req, res) => {
  const userItem = req.body
  console.log(userItem)
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
    const addUser = 'insert into userInfo set username = ?, password = ?'
    // 将用户密码就行加密
    userItem.password = bcrypt.hashSync(userItem.password, 10)

    db.query(addUser, [ userItem.username, userItem.password ], (err, results) => {
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
  console.log(user.password)
  const sqlStr = 'select * from userInfo where username = ?'
  db.query(sqlStr, user.username, function(err, results) {
    if(err) return res.send({
      status: 400,
      message: '登入失败，请稍后重试!'
    })
    // console.log(results.length)
    if(results.length !== 1) return res.cc('登入失败！', 300)
    
    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(user.password, results[0].password)
    console.log(compareResult)

    if(!compareResult) return res.cc('密码错误', 300)
    // 获取用户的信息
    const sqlStr2 = 'select * from userInfo where username = ?'
    db.query(sqlStr2, user.username, (err, results) => {
      if(err) return res.cc('登入失败')
      // 获取用户的信息，将用户的头像和密码剔除 
      const userInfo = { ...results[0], password: '', user_pic: '' }
      
      // 生成 token 字符串
      const tokenStr = jwt.sign(userInfo, config.jwtSecretKey, {
        expiresIn: '10h' // token有效期为10小时
      })

      // 登成功将生成的 token 数据返回给客户端
      res.send({
        status: 200,
        message: '登入成功',
        token: 'Bearer ' + tokenStr
      })
    })



    // 登入成功 生成 token
    //  
    // console.log(results[0].username)
    // if(results.length > 0) {
    //   if(results[0].username == user.username && results[0].password == user.password) {
    //     res.send({
    //       status: 200,
    //       message: '登入成功'
    //     })
    //   } else {
    //     res.send({
    //       status: 400,
    //       message: '用户名或密码错误！请重新输入'
    //     })
    //   }
    // } else {
    //   res.send({
    //     status: 400,
    //     message: '用户不存在'
    //   })
    // }
  })
  
}

/**
 * @api {post} /api/login 用户登入接口
 * @apiName login
 * @apiGroup User
 *
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
  const sqlStr = 'select username,email,user_pic from userInfo limit ?, ?'
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
 * @api {get} /my/getUsers 获取用户列表
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

// 更新用户数据
exports.upDataUserInfo = (req, res) => {
  const userInfo = req.body
  console.log(userInfo)
  const sqlStr1 = 'select * from userInfo where username = ?'
  db.query(sqlStr1, userInfo.username, (err, results) => {
    if(err) {
      return res.send({
        status: 500,
        message: '服务器发生错误，请稍后重试！'
      })
    }
    if(results.length > 0) {
      return res.send({
        status: 300,
        message: '更新失败，用户名已存在'
      })
    }
    const sqlStr = 'update userInfo set username = ?, email = ? where id = ?'
    db.query(sqlStr, [userInfo.username, userInfo.email, parseInt(userInfo.id)], (err,   results) => {
      if(err) {
        res.send({
          status: 400,
          message: '更新失败',
        })
      }
      console.log(results)
      res.send({
        status: 200,
        message: '用户信息更新成功'
      })
    })
  })
}

/**
 * @api {post} /my/upDataUserInfo 更新用户数据
 * @apiname updataUserInfo
 * @apiGroup User
 * 
 * @apiParam {String} nickname 更新的用户名
 * @apiParam {String} email 更新的 email 数据
 * @apiParam {Number} id 更新用户的 id
 * 
 * @apiSuccess {Number} status 请求体返回的状态码
 * @apiSuccess {String} message 返回的请求说明
*/

// 重置密码
exports.updataPassword = (req, res) => {
  const userItem = req.body
  console.log(userItem)
  const fandUser = 'select * from userInfo where id = ?'
  db.query(fandUser, parseInt(userItem.id), (err, results) => {
    if (err) return res.cc(err, 400)
    if (results.length !== 1) return res.cc('用户不存在', 300)
    // 判断提交的旧密码是否正确
    const compareResult = bcrypt.compareSync(userItem.oldPassword, results[0].password)
    if(!compareResult) return res.cc('原密码错误！', 300)
    userItem.newPassword = bcrypt.hashSync(userItem.newPassword, 10)
    const sqlStr = 'update userInfo set password = ? where id = ?'
    db.query(sqlStr, [userItem.newPassword, userItem.id], (err, results) => {
      if(err) return res.cc(err, 500)
      if(results.affectedRows !== 1) return res.cc('修改密码失败', 500)
      res.send({
        status: 200,
        message: '修改密码成功'
      })
    })
  })
}

/**
 * @api /my/updataPassword 重置用户密码
 * @apiName updataPassword
 * @apiGroup User
 * 
 * @apiParam {Number} id 用户id
 * @apiParam {String} oldPassword 旧密码
 * @apiParam {String} newPassword 新密码
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} messsge 请求说明 
*/


// 更换用户头像
exports.replaceUserPic = (req, res) => {
  const sqlStr = 'update userInfo set user_pic = ? where id = ?'
  db.query(sqlStr, [], (err, results) => {
    if(err) return res.cc(err, 500)
    if(results.affectedRows !== 1) return res.cc('更换头像失败', 400)
    res.cc('更换头像成功', 200)
  })
}

/**
 * @api /my/replaceUserPic 更换用户头像
 * @apiName replaceUserPic
 * @apiGroup User
 * 
 * @apiParam {String} token token编码
 * @apiParam {Number} id 用户id
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 请求说明
*/