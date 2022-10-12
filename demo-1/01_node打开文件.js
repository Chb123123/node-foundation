// 导入模块来操作文件
const fs = require('fs')

// 调用readFile读取文件 参数1 读取文件存放的路径 参数2 编码格式 默认指定utf-8 参数3 回调函数 拿到读取失败和成功的结果
fs.readFile('./abc.txt', 'utf-8', function(err, data) {
  // 如果读取成功，失败的参数为 null
  console.log(err)
  console.log('---------')
  // 打印成功的结果 ,如果读取成功 打印的数据为文件的数据
  console.log(data)
})