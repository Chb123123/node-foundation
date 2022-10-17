const mysql = require('mysql')
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'demo-1'
})

// // 定义删除数据的语句
// const sqlStr = 'delete from usernameTable where id = ?'
// db.query(sqlStr, 7, (err, results) => {
//   if(err) return console.log(err.message)
//   if(results.affectedRows === 1) {
//     console.log('删除数据成功')
//   }
// })

// 标记删除
const sqlStr = 'update usernameTable set status = 1 where id = ?'
db.query(sqlStr, 1, (err, results) => {
  if(err) return console.log(err.message)
  if(results.affectedRows === 1) {
    console.log('删除成功')
  }
})

// 查询标记为 0 的数据
const sqlStr1 = 'select * from usernameTable where status = 0'
db.query(sqlStr1, (err, results) => {
  if(err) return console.log(err.message)
  console.log(results)
})