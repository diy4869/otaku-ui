#! /usr/bin/env node

/*
 * @Author: last order
 * @Date: 2020-05-28 20:17:05
 * @LastEditTime: 2020-12-23 09:43:13
 */
const create = require('./command/create')
const publish = require('./command/publish')
const chalk = require('chalk')
const { Command } = require('commander')
const { version } = require('../package.json')
const program = new Command()


program.version(version, '-V --version', '查看当前版本')

program
  .command('create <componentName>')
  .description('创建组件')
  .helpOption('-h, --help', '查看帮助')
  .action(create)

program
  .command('publish')
  .description('更新文档网站')
  .helpOption('-h, --help', '查看帮助')
  .action(publish)

// 未知命令处理
program
  .arguments('<command>')
  .usage('cli <command> [options]')
  .action((cmd) => {
    console.log()
    program.outputHelp()
    console.log()
    console.log(` ${chalk.red(`未知命令：${cmd}`)}`)
  })

// 自定义帮助描述
program
  .helpOption('-h, --help', '查看帮助')

  // 如果没有command 就输出帮助
  if (process.argv.length === 2) {
    program.outputHelp()
    process.exit()
  }

program
  .parse(process.argv)
  
module.exports = program

