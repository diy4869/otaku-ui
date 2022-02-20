const { parse } = require('@babel/parser')

const parser = code => {
  return parse(code, {
    sourceType: 'module',
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      'jsx',
      'typescript'
    ]
  })
}



module.exports = parser
