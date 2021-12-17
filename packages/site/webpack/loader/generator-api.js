const path = require('path')
const fs = require('fs')
const ts = require('typescript')
const libPath = path.resolve(__dirname, '../../../otaku-ui')
const entryPath = path.resolve(libPath, './src/index.ts')

const readFile = path => {
  return fs.readFileSync(path, {
    encoding: 'utf-8'
  })
}
const entryContent = readFile(entryPath)
const lib = new Map()
const exportLibPath = []
const tsconfig = require('../../../otaku-ui/tsconfig.json')
const program = ts.createProgram([entryPath], tsconfig)

const parser = (filename, content) => {
  return ts.createSourceFile(filename, content, ts.ScriptTarget.ESNext, true)
}
const getDeclaration = kind => ts.SyntaxKind[kind]

const ast = parser('index.ts', entryContent)

// console.log(ast)

const getExportPath = () => {
  const filePath = []

  ast.forEachChild(node => {
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

const result = getExportPath()

// console.log(result)
const index = 0
const content = readFile(result[index].path)
const libAST = parser(result[index].path, content)

program.getTypeChecker()
const sourceFile = program.getSourceFiles()

const fileName = sourceFile.map(item => item.fileName)

let api = {}

libAST.forEachChild(node => {
  if (getDeclaration(node.kind) === 'InterfaceDeclaration') {
    api = {
      name: node.name.escapedText,
      code: content.substring(node.pos, node.end),
      property: node.members.map(item => {
        return {
          name: item.name.escapedText,
          type: content.substring(item.type.pos, item.type.end),
          required: item.questionToken ? false : true,
          defaultValue: undefined,
          jsDoc: ts.getJSDocTags(item).map(children => {
            return {
              tagName: children.tagName.escapedText,
              content: children.comment
            }
          })
        }
      })
    }
    console.log(api)
  }

  if (getDeclaration(node.kind) === 'FunctionDeclaration') {
    // console.log(node)

    const fnArgs = node.parameters.map(args => {
      return {
        name: args.name.escapedText,
        type:
          getDeclaration(args.type.kind) === 'TypeReference'
            ? args.type.typeName.escapedText
            : ''
      }
    })
  }
})
