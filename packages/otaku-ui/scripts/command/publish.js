const dayjs = require('dayjs')
const fs = require('fs')
const ora = require('ora')
const { promisify } = require('util')
const path = require('path')
const { exec } = require('child_process')
const { copy, checkDirectory } = require('../utils/fs')

const command = [
  'git add -A',
  `git commit -m "docs: 更新文档，日期: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
  'git push origin master'
]
const str = command.join(' && ')

module.exports = async () => {
  // const spinner = ora('正在努力构建中').start()
  const basePath = path.resolve(__dirname, '../../../../')
  const sitePath = path.resolve(basePath, './packages/site/dist')
  const buildPath = path.resolve(basePath, './otaku-ui-docs/docs')
  const execPromise = promisify(exec)

  if (await checkDirectory(sitePath)) {
    await execPromise(`rm -rf ${buildPath}`)
    await copy(sitePath, buildPath)
    const result = await execPromise(str, {
      shell: 'bash'
    })

    console.log(result)
    //   .then(({ stdout, stderr }) => {
    //   console.log(stdout, stderr)
    // })
  } else {

  }
}
