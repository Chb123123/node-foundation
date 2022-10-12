const fs = require('fs')

fs.readFile('./成绩文件/成绩.txt', 'utf-8', function(err,data) {
  console.log(err)
  console.log(data)
  const res = data.split(' ')
  console.log(res)
  const arr = []
  res.some(item => {
    
    item = item.replace('=', ':')
    console.log(item)
    arr.push(item)
    // const str = rus[0] + '的成绩为：' + rus[1] + '\n'
    
    // const data1 = [90, 10]
    // fs.writeFile('./成绩文件/成绩ok.txt', str, function(err){
    //   if(err) {
    //     console.log('文件写入失败')
    //     return
    //   }
    //   console.log('文件写入成功')
    // } )
  })
  console.log(arr)
  const newStr = arr.join('\r\n')
  console.log(newStr)
  fs.writeFile('./成绩文件/成绩ok.txt', newStr, function(err) {
    console.log(err)
  })
  // console.log(res)
})