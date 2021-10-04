const path = require('path')
const ora = require('ora')
const fs = require('fs')
const { render, getExt } = require('../utils/index')
const { mkdir, checkDirectory, checkFile } = require('../utils/fs')
const camelCase = require('camelcase')

const writeTemplate = (templateDir, writeDir, componentName, templateOptions = {}) => {
  const fileList = fs.readdirSync(templateDir)
  
  return new Promise(async (resolve) => {
    if (!await checkDirectory(writeDir)) {
      await mkdir(writeDir)
    }

    fileList.map(async (file) => {
      const ext = getExt(file)
      const fileOrDirectory = ext === 'art' ? `${componentName}.tsx` : file
      const templatePath = path.resolve(templateDir, file)
      const writePath = path.resolve(writeDir, fileOrDirectory)
      const dir = path.resolve(templateDir, file)

      if (await checkDirectory(dir)) {
        writeTemplate(templatePath, writePath, componentName)
      } else {
        const result = await render(templatePath, templateOptions)

        fs.writeFileSync(writePath, result)
      }
    })
    resolve()
  })
}

module.exports = async (name) => {
  const componentName = camelCase(name, { pascalCase: true })
  const writeDir = path.resolve(__dirname, '../../src/lib', name)
  const templateDir = path.resolve(__dirname, '../template')
  
  console.log('\n')
  const spinner = ora('正在努力创建模板中...').start()

  if (await checkDirectory(writeDir)) {
    spinner.fail('组件已存在')
  } else {
    await writeTemplate(templateDir, writeDir, name, {
      name: componentName
    }).then(() => {
      console.log('\n')
      spinner.succeed('创建成功')
    })
  }
}
