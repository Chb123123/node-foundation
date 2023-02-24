// const db = require('./mysqlFrom')
// 此代码仅仅用于向数据库填充数据，没有任何实际作用
const mysql = require('mysql')
const db = mysql.createPool({
  host: '127.0.0.1', 
  user: 'root', // 数据库用户名
  password: '123456', // 数据库密码
  database: 'demo-10-project'  // 要操作的数据库名称
})

const fs = require('fs')
const path = require('path')
// db.connect()

const file = path.join(__dirname, '/imageWZ') // '/imageWZ' 为存放图片的文件路径
// console.log(file)
fs.readdir(file, 'utf8', function(err, data) {
  if (err) return console.log(err)
  console.log(data.length)
  for(let i = 0; i < data.length; i++) {
    const file1 = path.join(file, '/' + data[i])
    // console.log(file1)
    fs.readdir(file1, 'utf8', function(err, data1) {
      if(err) return console.log('读取文件失败')
      for (let j = 0; j < data1.length; j++) {
        const url = 'http://127.0.0.1/image/' + data[i] + '/' + data1[j]
        const sqlStr = 'insert into imageWZ set imageUrl = ?, imageType = ?'
        db.query(sqlStr,[url, data[i]], (err, results) => {
          if(err) return console.log(err)
          if(results.affectedRows == 1) {
            return console.log(url + '添加成功')
          }
          console.log(url + '添加失败!!!')
        })
      }
    })
  }
  return true
})
