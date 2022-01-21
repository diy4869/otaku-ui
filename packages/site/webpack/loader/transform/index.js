const { 
    getDeclaration, 
    isExport, 
    isExportDefault ,
    readFile,
    parser
} = require('../utils')
const ts = require('typescript')
const path = require('path')
const fs = require('fs')

const transform = (filePath) => {
    const content = readFile(filePath)
    const ast = parser(filePath, content)
    const api = {}
    const importPath = {}
    const exportList = []
    
    const getType = (typeName) => {
        const type = api[typeName]

        if (type) {
            // 说明是引入的
            if (type.importPath) {
                const importPath = path.resolve(type.importPath)
                const importAST = parser(importPath)
                console.log(importAST)
               
            }

            return type
        }
    }

    ast.forEachChild(node => {
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
                reference: item.type.kind === 177 ? getType(item.name.escapedText) : undefined,
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
            exportDefault: isExportDefault(node),
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

    return exportList
}

exports.transform = transform
