const fs = require('fs')
const loader = require('./md-loader')
const path = require('path')

// const content = fs.readFileSync(path.resolve(__dirname, './test.md'), {
//   encoding: 'utf-8'
// })

// loader(content)

module.exports = loader
