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
  let arr = []

  // node.forEachChild(el => {
  //   arr = el.declarationList.declarations[0].name.elements.map(children => {
  //     return {
  //       name: children.name.escapedText,
  //       value: children.initializer?.text
  //     }
  //   })
  // })
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
const content = readFile(path.resolve(__dirname, './test.tsx'))
const libAST = parser('./index.tsx', content)
const sourceFile = program.getSourceFile(entryPath)

const api = {}
const importPath = {}
const exportList = []

libAST.forEachChild(node => {
  const type = getDeclaration(node.kind)

  switch (type) {
    case 'ImportDeclaration':
      const importClause = node.importClause

      if (importClause.namedBindings) {
        // 解构引入
        importClause.namedBindings.elements.reduce((obj, current) => {
          obj[current.name.escapedText] = {
            // 解构
            deconstruct: true,
            name: current.name.escapedText,
            importPath: node.moduleSpecifier.text
          }

          return obj
        }, api)
      } else {
        // 命名导出
        const name = importClause.name.escapedText
        importPath[name] = {
          name,
          nameExport: true,
          importPath: node.moduleSpecifier.text
        }
      }
      break
    case 'InterfaceDeclaration':
      // 继承的接口
      const extendsInterface = node.heritageClauses?.[0].types?.map(item => {
        return {
          name: item.expression.escapedText
        }
      })

      api[node.name.escapedText] = {
        name: node.name.escapedText,
        code: content.substring(node.pos, node.end),
        extendProperty: extendsInterface?.reduce((total, current) => {
          return total.concat(api[current.name])
        }, []),
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
      break
    case 'TypeAliasDeclaration':
      api[node.name.escapedText] = {
        name: node.name.escapedText,
        code: content.substring(node.pos, node.end)
      }
      break
    case 'FunctionDeclaration':
      exportList.push({
        exportDefault: false,
        export: isExport(node),
        functionName: node.name.escapedText,
        args:  node.parameters?.map(args => {
          const typeName = getDeclaration(args?.type?.kind) === 'TypeReference'
            ? args.type.typeName.escapedText : ''
          const type = api[typeName]
  
          return {
            name: args.name.escapedText,
            type
          }
        })
      })
      break
  }
})

console.log(exportList)

console.log(api)

