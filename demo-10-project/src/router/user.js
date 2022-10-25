const express = require('express')
const router = express.Router()

// 导入处理函数
const userHandler = require('../router_handler/user')
// 注册新用户
router.post('/reguser', userHandler.reguser)

// 注册登入模块
router.post('/login', userHandler.login)

// 获取用户列表
router.get('/getUsers', userHandler.getUsers)

// 更新用户信息
router.post('/upDataUserInfo', userHandler.upDataUserInfo)

// 将路由共享出去
module.exports = router
