const dayjs = require('dayjs')
const ora = require('ora')
const { promisify } = require('util')
const path = require('path')
const { exec } = require('child_process')
// const { copy, checkDirectory } = require('../utils/fs')

module.exports = async () => {
  const basePath = path.resolve(__dirname, '../../../../')
  const sitePath = path.resolve(basePath, './packages/my-vue-app/dist')
  const execPromise = promisify(exec)
  const spinner = ora()
  const buildCommand = [
    `cd ${sitePath}`,
    'npm run build',
  ].join(' && ')

  let buildTime = 0

  const interval = setInterval(() => {
    buildTime++
    spinner.start(`buildTime: ${buildTime}s`)
  }, 1000)

  console.log(sitePath)
  execPromise(buildCommand).then(async () => {
    const command = [
      `cd ${sitePath}`,
      'git add -A',
      `git commit -m "docs: 更新文档，日期: ${dayjs().format(
        'YYYY-MM-DD HH:mm:ss'
      )}"`,
      'git push origin master'
    ]
    const str = command.join(' && ')

    await execPromise(str)
    spinner.succeed(`构建完成，本次耗时：${buildTime}s`)
    clearInterval(interval)
  })
}
