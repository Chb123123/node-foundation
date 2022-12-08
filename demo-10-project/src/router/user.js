const express = require('express')
const router = express.Router()
// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入验证规则
const { updata_userInfo_schema, updataPassword_schema, updataUserPic } = require('../schema/user')

const userHandler = require('../router_handler/user')
// 注册登入模块
router.post('/login', userHandler.login)

// 获取用户列表
router.get('/getUsers', userHandler.getUsers)

// 更新用户信息
router.post('/upDataUserInfo', expressJoi(updata_userInfo_schema ),userHandler.upDataUserInfo)

// 重置密码
router.post('/updataPassword', expressJoi(updataPassword_schema), userHandler.updataPassword)

// 更换用户头像
router.post('/replaceUserPic', expressJoi(updataUserPic), userHandler.replaceUserPic)

// 将路由共享出去
module.exports = router
