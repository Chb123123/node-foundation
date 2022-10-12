const path = require('path')

const pathStr = 'a/c/b/index.html'
const str = path.basename(pathStr)
console.log(str)
const str1 = path.basename(pathStr, '.html')
console.log(str1)