module.exports = {
  tabWidth: 2,
  semi: false, // 是否添加结尾分号
  quotes: true, 
  jsxSingleQuote: true, // jsx单引号
  trailingComma: 'none',
  jsxBracketSameLine: true, // jsx 结尾是否换行
  arrowParens: 'avoid', // 箭头函数参数只有一个不显示括号
  endOfLine: 'crlf',
  embeddedLanguageFormatting: 'auto', // 自动格式化
  overrides: [
    {
      files: "*.js",
      options: {
        parser: "babel"
      }
    },
    {
      files: "*.ts",
      options: {
        parser: "typescript"
      }
    }
  ]
}