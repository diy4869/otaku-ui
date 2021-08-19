const path = require('path')
const ora = require('ora')
const fs = require('fs')
const { render, getExt } = require('../utils/index')
const { mkdir, checkDirectory, checkFile } = require('../utils/fs')
const camelCase = require('camelcase')
const { exec } = require('child_process')

module.exports = async (name, options) => {
  const componentName = camelCase(name, {pascalCase: true })
  const dir = path.resolve(__dirname, '../../src/lib', name)

  const templateDir = path.resolve(__dirname, '../template')
  const fileList = fs.readdirSync(templateDir)
  console.log('\n')
  const spinner = ora('正在努力创建模板中...').start()

  for await (let file of fileList) {
    const ext = getExt(file)
    const filename = ext === 'art' ? `${name}.tsx` : file

    const templatePath = path.resolve(templateDir, file)
    const writePath = path.resolve(dir, filename)
    const result = await render(templatePath, {
      name: componentName
    })

    if (await checkDirectory(dir)) {
      if (!await checkFile(writePath)) {
        fs.writeFileSync(writePath, result)
      } else {
        return spinner.fail('组件已存在')
        // return console.log('组件已存在')
      }
    } else {
      await mkdir(dir)
      fs.writeFileSync(writePath, result)
    }
  }

  console.log('\n')
  spinner.succeed('创建成功')
}
