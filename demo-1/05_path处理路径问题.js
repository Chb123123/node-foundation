const path = require('path')
const fs = require('fs')

fs.readFile(path.join(__dirname, '/abc.txt'), 'utf-8', function(err, data) {
  if(err) {
    console.log('读取文件失败')
    return
  } else {
    console.log('读取文件成功:' + data)
  }
})
