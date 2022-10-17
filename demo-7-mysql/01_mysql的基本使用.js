const mysql = require('mysql')

// 建立与 Mysql 数据库的连接
const db = mysql.createPool({
  host: "127.0.0.1",  // 数据库的ip地址
  user: "root", // 登入数据库的账号
  password: '123456',  // 登入数据库的密码
  database: 'demo-1' // 要连接的数据库
})

// 监测 mysql 模块能否正常工作
// db.query('select name from usernameTable', (err, results) => {
//   if (err) {
//     return console.log(err.message)
//   }
//   console.log(results)  // 只要能打印出 [ RowDatePacket { "1": 1 } ] 就证明 数据库连接成功
// })


// 查询mysql 数据库中的表

const sqlStr = 'select * from usernameTable'  // 执行的语句是 select 则查询的语句是一个数组
db.query(sqlStr, (err, results) => {
  if(err) return console.log(err.message)
  console.log(results)
})
