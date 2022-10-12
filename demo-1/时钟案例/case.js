const fs = require('fs')
const path = require('path')

// 创建正则表达式 /s表示空白符 /S 表示非空白符 *表示任意次
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/
// 路径变量
// console.log('123')

fs.readFile(path.join(__dirname, '/index.html'), 'utf-8', function(err, data) {
  if(err) {
    console.log('读取文件失败' + err)
    return
  }
  // 读取文件成功后 解析出 css 文件 js 文件和 html 文件
  // console.log(data)
  resolveCSS(data)
  resolveHTML(data)
  resolveJS(data)
})

// 解析index.html文件中的 js样式
function resolveJS(data) {
  // 将index.html文件内的 css样式提取出来
  const style = regScript.exec(data)
  const newCSS = style[0].replace('<script>', '').replace('</script>', '')
  // console.log(newCSS)
  fs.writeFile(path.join(__dirname, '/index.js'), newCSS, 'utf-8', function(err) {
    if(err) {
      console.log('写入js文件失败' + err) 
      return
    }
    console.log('写入js文件成功')
  })
}

// 解析index.html文件中的 css样式
function resolveCSS(data) {
  // 将index.html文件内的 css样式提取出来
  const style = regStyle.exec(data)
  const newJS = style[0].replace('<style>', '').replace('</style>', '')
  // console.log(newJS)
  fs.writeFile(path.join(__dirname, '/index.css'), newJS, 'utf-8', function(err) {
    if(err) {
      console.log('写入css样式文件失败' + err) 
      return
    }
    console.log('写入css文件成功')
  })
}

// 解析index.html中的html文件
function resolveHTML(data) {
  const newHTML = data.replace(regStyle, "<link rel='stylesheet' href='index.css'></link>")
  .replace(regScript, "<script src='index.js'></script>")
  // console.log(newHTML)
  fs.writeFile(path.join(__dirname, '/index.html'), newHTML, 'utf-8', function(err) {
    if(err) {
      console.log('写入文件失败')
      return
    }
    console.log('写入html文件成功')
  })
}