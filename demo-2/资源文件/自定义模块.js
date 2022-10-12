// console.log('自定义模块')

// function sysName() {
//   console.log('自定义函数')
// }
// sysName()
// 共享模块
module.exports.username = '张三'
module.exports.sayHello = function() {
  console.log('hello')
}