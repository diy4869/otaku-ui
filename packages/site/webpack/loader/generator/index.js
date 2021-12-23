const path = require('path')
const fs = require('fs')
const ts = require('typescript')
const libPath = path.resolve(__dirname, '../../../../otaku-ui')
const entryPath = path.resolve(libPath, './src/index.ts')

const readFile = path => {
  return fs.readFileSync(path, {
    encoding: 'utf-8'
  })
}

const getDefaultValue = node => {
  const arr = []

  node.forEachChild(el => {
    console.log(el)
    arr = el.declarationList.declarations[0].name.elements.map(children => {
      return {
        name: children.name.escapedText,
        value: children.initializer?.text
      }
    })
  })
}

const entryContent = readFile(entryPath)
const lib = new Map()
const tsconfig = require('../../../../otaku-ui/tsconfig.json')
const program = ts.createProgram([entryPath], tsconfig)

const parser = (filename, content) => {
  return ts.createSourceFile(filename, content, ts.ScriptTarget.ESNext, true)
}
const isExport = node => node.modifiers?.length === 1 && getDeclaration(node.modifiers[0].kind)  === 'ExportKeyword'
const getDeclaration = kind => ts.SyntaxKind[kind]
const ast = parser('index.ts', entryContent)


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

const exportLibPath = getExportPath()


const index = 0
const content = readFile(path.resolve(__dirname, './test.tsx'))
const libAST = parser('./index.tsx', content)

const sourceFile = program.getSourceFile(entryPath)


let api = {}

libAST.forEachChild(node => {
  if (getDeclaration(node.kind) === 'InterfaceDeclaration') {
    api[node.name.escapedText] = {
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
  }


  if (getDeclaration(node.kind) === 'FunctionDeclaration' && isExport(node)) {
    
    getDefaultValue(node.body)
    // console.log(node.getChildren())

    const fnArgs = node.parameters?.map(args => {
      return {
        name: args.name.escapedText,
        type:
          getDeclaration(args?.type?.kind) === 'TypeReference'
            ? args.type.typeName.escapedText
            : ''
      }
    })
  }
})
