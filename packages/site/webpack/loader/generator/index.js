const path = require('path')
const fs = require('fs')
const ts = require('typescript')
const libPath = path.resolve(__dirname, '../../../../otaku-ui')
const entryPath = path.resolve(libPath, './src/index.ts')
const { transform } = require('../transform/index')
const { getDeclaration, parser, readFile, getAbsolutePath } = require('../utils')
const glob = require('glob')
const tsconfig = require('../../../../otaku-ui/tsconfig.json')
const program = ts.createProgram([entryPath], tsconfig)
const entryContent = readFile(entryPath)
const entryAST = parser('index.ts', entryContent)



// return
const getExportPath = () => {
  const filePath = []

  entryAST.forEachChild(node => {
    if (getDeclaration(node.kind) === 'ExportDeclaration') {
      const value = node.moduleSpecifier.text

      filePath.push({
        export: [],
        path: getAbsolutePath(path.resolve(libPath, './src'), value)
      })
    }
  })

  return filePath
}

const exportLibPath = getExportPath()

const sourceFile = program.getSourceFile(entryPath)

const filePath = path.resolve(__dirname, './test.tsx')

const transformAll = () => {
  const obj = {}
  
  for (let i = 0; i < exportLibPath.length; i++) {
    console.log(exportLibPath[i])
    transform(exportLibPath[i].path, obj)
  }
  console.log(obj)

  return obj
}

// transform(filePath, {})

transform('D:\\code\\otaku-ui\\packages\\otaku-ui\\src\\lib\\pagination\\pagination.tsx', {})
// console.log(exportLibPath)
transformAll()




// console.log(
// backPath(picker, '../../calendar/calendar')
// console.log(glob.sync('**/*.d.ts'))

module.exports = transform




