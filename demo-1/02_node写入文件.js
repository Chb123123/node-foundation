const fs = require('fs')

// 第一个参数
fs.writeFile('./bcd.txt','ok123',function(err){
  console.log(err)
})