const express = require('express')
const router = express.Router()
// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

// 验证规则
const { reg_login_schema, updata_userInfo_schema } = require('../schema/user')
// 导入处理函数
const userHandler = require('../router_handler/user')
// 注册新用户 
// 将 req.body 内的数据进行验证 
router.post('/reguser',expressJoi(reg_login_schema), userHandler.reguser)

// 注册登入模块
router.post('/login', userHandler.login)

module.exports = router