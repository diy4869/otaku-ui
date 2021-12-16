const path = require('path')
const fs = require('fs')
const traverse = require('@babel/traverse').default
const parser = require('./compiler')
const libPath = path.resolve(__dirname, '../../../otaku-ui')
const entryPath = path.resolve(libPath, './src/index.ts')
const t = require('@babel/types')

const readFile = path => {
  return fs.readFileSync(path, {
    encoding: 'utf-8'
  })
}
const entryContent = readFile(entryPath)
const lib = new Map()
const exportLibPath = []
const ast = parser(entryContent)

traverse(ast, {
  ExportAllDeclaration ({ node }) {
    const value = node.source.value
    const filePath = path.resolve(libPath, './src', `${value}.tsx`)

    lib.set(filePath, undefined)
    exportLibPath.push(filePath)
  }
})

const fileContent = readFile(exportLibPath[0])
const fileAst = parser(fileContent)
const data = []

traverse(fileAst, {
  enter (path) {
    if (path.isFunction()) {
      const result = path.findParent(path => path.isExportDeclaration())
      if (result) {
        const node = path.node
        let exportName

        if (node.type === 'ArrowFunctionExpression') {
          const parent = path.parent
          exportName = parent.id.name
        }
        if (node.type === 'FunctionDeclaration') {
          exportName = node.id.name
        }

        const fnArgs = node.params.map(args => {
          const name = args.typeAnnotation.typeAnnotation.typeName.name
          console.log(result)
          return {
            name: args.name,
            typeName: name
          }
        })

        data.push({
          exportName
        })

      }
    }
  }
})
