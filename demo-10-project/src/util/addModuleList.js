const mysql = require('mysql')
const fs = require('fs')
const path = require('path')
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'demo-10-project'
})


let fileRouter = path.join(__dirname, '/aaa.txt')  // 获取的性列表文件
let nameList = path.join(__dirname, '/ddd.txt') // 获取的名列表文件

// 需要新增的数据库数据数量
let addDataCount = 1000

function getRandom(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}
let sqlStr = 'insert into moduleList SET USER = ?, price = ?, age=?, gender=?'
fs.readFile(fileRouter, 'utf-8', (err, data) => {
  if(err) return console.log('获取文件数据失败')
  // 数据列表
  let fileData, fileData1
  fileData = data.split('、')
  fs.readFile(nameList, 'utf-8', (err, data) => {
    if(err) return console.log('获取数据列表失败')
    fileData1 = data.split('、')
    for(let i = 0; i < addDataCount; i++) {
      let randomNum = getRandom(0, fileData.length - 1) // 当前生成的性
      let randomNum1 = getRandom(0, fileData1.length - 1) // 当前生成的名
      let isGender = getRandom(0, 1)
      let age = getRandom(20, 60)
      let price = getRandom(50, 10000)
      db.query(sqlStr, [fileData[randomNum] + fileData1[randomNum1],price, age, isGender ? '女':'男'], (err, result) => {
        if(err) return console.log(err)
        if(result.affectedRows === 1) {
          console.log('新增数据成功')
        } else {
          console.log('新增数据失败')
        }
      })
    }
  })
})
