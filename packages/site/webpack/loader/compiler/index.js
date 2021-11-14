const { parse } = require('@babel/parser')

const parser = code => {
  return parse(code, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'typescript'
    ]
  })
}



module.exports = parser
