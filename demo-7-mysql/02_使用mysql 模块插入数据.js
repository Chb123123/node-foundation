const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'demo-1'
})

// // 定义一个要插入的用户信息对象
// const userItem = { name: '劳王', age: 22 }
// // 定义要执行的sql语句
// const sqlStr = 'insert into usernameTable ( name, age ) values (?, ?)'
// db.query(sqlStr,[ userItem.name, userItem.age ], (err, results) => {
//   if(err) return console.log(err.message)
//   // console.log(results)
//   // 只有 results.affectedRows = 1 时才算插入成功
//   if(results.affectedRows == 1) {
//     console.log('插入数据成功')
//   }
// })


// 插入数据的快捷方式
const user = { name: '老伴', age: 67 }
const sqlStr = 'insert into usernameTable set ?'
db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message)
  if(results.affectedRows === 1) {
    console.log('插入数据成功')
  }
})
