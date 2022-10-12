const fs = require('fs')

console.log(__dirname)
fs.readFile( __dirname + '/abc.txt','utf-8', function(err, data) {
  console.log(err)
  console.log('------------')
  console.log(data)
})