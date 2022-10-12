// const m = require('./06_exports对象')

// console.log(m)
const timer = +new Date()
// console.log(timer)
// console.log(Math.floor(timer / 1000 % 60))
const m = Math.floor(timer / 1000 % 60) < 10? '0'+Math.floor(timer / 1000 % 60) : Math.floor(timer / 1000 % 60)

// console.log(Math.floor(timer /1000 / 60  % 60))
const f = Math.floor(timer /1000 / 60  % 60)< 10 ? '0' + Math.floor(timer /1000 / 60  % 60) : Math.floor(timer /1000 / 60  % 60)
console.log(Math.floor(timer /1000 / 60  / 60 % 24) + 8)
const s = Math.floor(timer /1000 / 60  / 60 % 24) + 8 < 10 ? '0' + (Math.floor(timer /1000 / 60  / 60 % 24) + 8) : Math.floor(timer /1000 / 60  / 60 % 24) + 8
const newData = `当前时间：${s}:${f}:${m}`
console.log(newData)