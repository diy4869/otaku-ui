const path = require('path')
const ora = require('ora')
const fs = require('fs')
const { render, getExt } = require('../utils/index')
const { mkdir, checkDirectory, checkFile } = require('../utils/fs')
const camelCase = require('camelcase')

const writeTemplate = (templateDir, writeDir, componentName, templateOptions = {}) => {
  const fileList = fs.readdirSync(templateDir)

  return new Promise(async (resolve, reject) => {
    for (let file of fileList) {
      const ext = getExt(file)
      const filename = ext === 'art' ? `${componentName}.tsx` : file

      console.log(filename)
      const templatePath = path.resolve(templateDir, file)
      const writePath = path.resolve(writeDir, filename)
      const result = await render(templatePath, templateOptions)

      if (await checkDirectory(writeDir)) {
        if (!(await checkFile(writePath))) {
          fs.writeFileSync(writePath, result)
        } else {
          reject()
        }
      } else {
        await mkdir(writeDir)
        fs.writeFileSync(writePath, result)
      }
    }
  })
}

module.exports = async (name) => {
  const componentName = camelCase(name, { pascalCase: true })
  // const dir = path.resolve(__dirname, '../../src/lib', name)
  const writeDir = path.resolve(__dirname, name)
  const templateDir = path.resolve(__dirname, '../template')
  
  console.log('\n')
  const spinner = ora('正在努力创建模板中...').start()

  writeTemplate(templateDir, writeDir, name, {
    name: componentName
  }).then(() => {
    console.log('\n')
    spinner.succeed('创建成功')
  }).catch(() => {
    spinner.fail('组件已存在')
  }).finally(() => {
    spinner.stop()
  })
}
