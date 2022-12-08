const joi = require('joi')

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 正则表达式规则 [S]表示空 {6-12} 表示6-12个字符之间 required() 表示不能为 undefined 
const password = joi.string().pattern(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/).required()

exports.reg_login_schema = {
  // 表示在 req.body 内传递的数据进行验证
  body: {
    username,
    password
  },

  query: {

  },

  params: {

  }
}

// 验证用户传递的基本信息 integer() 必须是整数类型
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

exports.updata_userInfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}


// 更新用户密码
exports.updataPassword_schema = {
  body: {
    oldPassword: password,
    // 旧密码不能与新密码保持一致
    // joi.ref('oldPwd) 表示 newPwd的值 必须和 oldPwd 的值保持一致
    // joi.not(joi.ref('old')) 表示 newPwd 的值不能 和 newPwd 保持一致
    // .concat() 用于合并 joi.not(joi.ref('oldPwd)) 和 password 这两条验证规则
    newPassword: joi.not(joi.ref('oldPassword')).concat(password),
    id: id
  }
}

// dataUrl() 验证 字符串是不是 base64 的格式
const avatar = joi.string().dataUri().required()

exports.updataUserPic = {
  body: {
    avatar
  }
}