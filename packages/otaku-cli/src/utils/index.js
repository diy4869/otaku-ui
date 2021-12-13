const template = require('art-template')
const inquirer = require('inquirer')
const fs = require('fs')

exports.render = (path, options) => {
  const file = fs.readFileSync(path, {
    encoding: 'utf-8'
  })

  if (file) {
    return template.render(file, options)
  }
  return ''
}

exports.prompt = question => inquirer.prompt(question)

exports.getExt = (str) => {
  if (typeof str !== 'string') throw TypeError(`${str} is not a string`)
  const start = str.lastIndexOf('.')

  if (start !== -1) {
    const ext = str.substr(start + 1, str.length)
    return ext
  }
}
