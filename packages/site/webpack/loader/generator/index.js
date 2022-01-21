const path = require('path')
const fs = require('fs')
const ts = require('typescript')
const libPath = path.resolve(__dirname, '../../../../otaku-ui')
const entryPath = path.resolve(libPath, './src/index.ts')
const { transform } = require('../transform/index')
const { getDeclaration, parser, readFile } = require('../utils')

const tsconfig = require('../../../../otaku-ui/tsconfig.json')
const program = ts.createProgram([entryPath], tsconfig)
const entryContent = readFile(entryPath)
const entryAST = parser('index.ts', entryContent)


const getExportPath = () => {
  const filePath = []

  entryAST.forEachChild(node => {
    if (getDeclaration(node.kind) === 'ExportDeclaration') {
      const value = node.moduleSpecifier.text

      filePath.push({
        export: [],
        path: path.resolve(libPath, './src', `${value}.tsx`)
      })
    }
  })

  return filePath
}

const exportLibPath = getExportPath()

const sourceFile = program.getSourceFile(entryPath)

const filePath = path.resolve(__dirname, './test.tsx')

const data = transform(filePath)

console.log(data)









