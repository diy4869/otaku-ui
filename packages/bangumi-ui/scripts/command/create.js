const path = require('path')
const fs = require('fs')
const { render, getExt } = require('../utils/index')
const { mkdir, checkDirectory, checkFile } = require('../utils/fs')

module.exports = async (name) => {
  const dir = path.resolve(__dirname, '../../test', name)
  const templateDir = path.resolve(__dirname, '../template')
  const fileList = fs.readdirSync(templateDir)

  for await (let file of fileList) {
    const templatePath = path.resolve(templateDir, file)
    const writePath = path.resolve(dir, file)
    const result = await render(templatePath, {
      name: name,
      name2: 'sdf'
    })

    if (await checkDirectory(dir)) {
      if (!await checkFile(writePath)) {
        fs.writeFileSync(writePath, result)
      } else {
        return console.log('组件已存在')
      }
    } else {
      await mkdir(dir)
      fs.writeFileSync(writePath, result)
    }
  }
}
