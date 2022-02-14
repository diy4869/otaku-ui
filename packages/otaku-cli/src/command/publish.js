const dayjs = require('dayjs')
const ora = require('ora')
const { promisify } = require('util')
const path = require('path')
const { exec } = require('child_process')
const { copy, checkDirectory } = require('../utils/fs')

module.exports = async () => {
  const spinner = ora('正在努力构建中').start()
  const basePath = path.resolve(__dirname, '../../../../')
  const sitePath = path.resolve(basePath, './packages/site/dist')
  // const buildPath = path.resolve(basePath, './otaku-ui-docs/docs')
  const execPromise = promisify(exec)

  if (await checkDirectory(sitePath)) {
    // await execPromise(`rm -rf ${buildPath}`)
    // await copy(sitePath, buildPath)
    const command = [
      `cd ${sitePath}`,
      'git add -A',
      `git commit -m "docs: 更新文档，日期: ${dayjs().format(
        'YYYY-MM-DD HH:mm:ss'
      )}"`,
      'git push -f origin master'
    ]
    // console.log(command)
    const str = command.join(' && ')

    await execPromise(str)
    spinner.succeed('构建完成')
    // console.log(path.resolve(sitePath, './docs'))
    await execPromise(`rm -rf ${path.resolve(sitePath, './docs')}`)
  } else {
    spinner.fail('构建失败')
  }
}
