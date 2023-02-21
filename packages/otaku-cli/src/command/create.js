const path = require('path')
const ora = require('ora')
const fs = require('fs')
const { promisify } = require('util')
const camelCase = require('camelcase')
const inquirer = require('inquirer')
const buffer = require('buffer')
const { render, getExt } = require('../utils/index')
const { mkdir, checkDirectory, checkFile } = require('../utils/fs')
const ts = require('typescript')
const prettier = require('prettier')
const question = require('../question/index')



const writeTemplate = (templateDir, writeDir, componentName, templateOptions = {}) => {
  const fileList = fs.readdirSync(templateDir)
  
  return new Promise(async (resolve) => {
    if (!await checkDirectory(writeDir)) {
      await mkdir(writeDir)
    }

    fileList.forEach(async (file) => {
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
  const rootDir = path.resolve(__dirname, '../../../')
  const writeDir = path.resolve(rootDir, './otaku-ui/src/lib', name)
  const templateDir = path.resolve(__dirname, '../template')
  const entryPath = path.resolve(rootDir, './otaku-ui/src', 'index.ts')

  let content = fs.readFileSync(entryPath, {
    encoding: 'utf-8'
  })
  const siteRouterPath = path.resolve(rootDir, './my-vue-app/src/router/index.tsx')
  console.log(siteRouterPath)
  const routerContent = fs.readFileSync(siteRouterPath, {encoding: 'utf-8'})

  const ast = ts.createSourceFile('index.tsx', routerContent, ts.ScriptTarget.ESNext, true)

  let router = []
  ast.forEachChild(node => {
    if (node.kind === ts.SyntaxKind.ExportAssignment) {
      router = node.expression.elements.reduce((total, current) => {
        const arrayToObject = arr => arr.properties.map(item => {

          return [item.name.escapedText, routerContent.substring(item.initializer.pos, item.initializer.end).trimStart().replaceAll(/(")/g, '')]
        })
        const getProperty = (arr, key) => arr.properties.find(item => item.name.escapedText === key)
        const obj = Object.fromEntries(arrayToObject(current))

        if (obj.title) {
          const children = getProperty(current, 'children')
          return total.concat({
            title: obj.title,
            children: children.initializer.elements.map(item => {
              return Object.fromEntries(arrayToObject(item))
            })
          })
        }
        return total
      }, [])
      // console.log(router)
    }
  })

  const result = await inquirer.prompt(question)
  const findIndex = router.findIndex(item => item.title === result.componentType)

  // console.log(result)
  console.log('\n')

  switch (result.componentType) {
    case '其他':
      if (findIndex === -1) {
        router.push({
          title: '其他',
          children: [
            {
              title: result.title,
              path: result.path,
              component: `lazy(() => import('otaku-ui/src/lib/${componentName}/demo/README.md'))`
            }
          ]
        })
      } else {
        router[findIndex].children.push({
          title: result.title,
          path: result.path,
          component: `lazy(() => import('otaku-ui/src/lib/${componentName}/demo/README.md'))`
        })
      }
      
      break
    default:
      
    console.log(router, result)
      router[findIndex].children.push({
        title: result.title,
        path: result.path,
        component: `lazy(() => import('otaku-ui/src/lib/${componentName}/demo/README.md'))`
      })
      break
  }

  const wrap = () =>'\n'
  const space = (num = 1) => new Array(num).fill('').join('  ') 
  const str = `${wrap()}${space(1)}
import { lazy } from 'react'

export default [${
    router.map(item => {
      const itemKeys = Object.keys(item)
      return space(2) + `{${itemKeys.map(key => {
        if (key === 'children') {
          return `${key}: [${item[key].map(children => {
            const val = (childrenKey) => childrenKey !== 'component' ? `'${children[childrenKey]}'` : children[childrenKey]

            
            return `{${Object.keys(children).map(childrenKey => `${childrenKey}: ${val(childrenKey)}`)}},`
          }).join('')}]`
        } else {
          return `${key}: '${item[key]}',\n`
        }
      }).join('')}`
    })
  }
  `


  // console.log(prettier.format(str, {
  //   semi: false, 
  //   parse: 'babel'
  // }))

  // fs.writeFileSync('./test.tsx',str)
  // fs.writeFileSync()

 
  // const spinner = ora('正在努力创建模板中...').start()

//   if (await checkDirectory(writeDir)) {
//     spinner.fail('组件已存在')
//   } else {
//     await writeTemplate(templateDir, writeDir, name, {
//       name: componentName
//     }).then(() => {
//       content += `
// export * from './lib/${name}/${name}'`

//       fs.writeFileSync(entryPath, content, {
//         encoding: 'utf-8'
//       })
//       console.log('\n')
//       spinner.succeed('创建成功')
//     })
//   }
}
