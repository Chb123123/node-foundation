const mysql = require('mysql')
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'demo-1'
})

// // 定义更新后的数据
// const newUser = { name: '赵晨旭', age: 26, id: 1 }
// const sqlStr = 'update usernameTable set name = ?, age = ? where id = ?'

// db.query(sqlStr,[ newUser.name, newUser.age, newUser.id ], (err, results) => {
//   if(err) return console.log(err.message)
//   // console.log(results)
//   if(results.affectedRows === 1) {
//     console.log('修改数据成功')
//   }
// })



// 更新数据的便捷方式
const newUser = { name: '绿茶', age: 26, id: 1 }
const sqlStr = 'update usernameTable set ? where id = ?'

db.query(sqlStr,[ newUser, newUser.id ], (err, results) => {
  if(err) return console.log(err.message)
  // console.log(results)
  if(results.affectedRows === 1) {
    console.log('修改数据成功')
  }
})