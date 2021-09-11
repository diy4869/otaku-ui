const dayjs = require('dayjs')
const { exec } = require('child_process')
const { copy } = require('../utils/fs')

const command = [
  'git add -A',
  `git commit -m docs: 更新文档，日期: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
  'git push origin master'
]
const str = command.join(' && ')

// exec(str)
module.exports = () => {

}
