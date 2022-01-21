const { getDeclaration, isExport, isExportDefault, readFile, parser } = require('../utils')
const ts = require('typescript')
const path = require('path')
const fs = require('fs')
const enhancedResolve = require('enhanced-resolve')
const { promisify } = require('util')


const transform = filePath => {
  // 存放每个文件的解析结果
  const map = {}
  /**
   * 
   * @param {*} filePath 当前的文件路径
   * @param {*} refererPath 引用的文件路径
   * @returns 
   */
  const run = (filePath) => {
    if (map[filePath]) return

    const content = readFile(filePath)
    const ast = parser(filePath, content)
    const api = {}
    const importPath = {}
    const exportList = []

    /**
     * 
     * @param {string} currentPath 当前的文件
     * @param {string} typeName 当前文件引用到的类型
     * @returns 
     */
    const getType = (currentPath, typeName) => {
      const type = api[typeName]

        if (type) {
          // 说明是引入的
          if (type.importPath) {
            const importPath = path.resolve(filePath, '../')
            const parserPath = enhancedResolve.create.sync({
              extensions: ['.ts', '.tsx'],
            })
  
            const result = parserPath({}, importPath, type.importPath, {})
            if (result) {
              // 判断该文件时否已经被解析过
              if (map[result]) {
                api[typeName].typeReference = map[result].type[typeName]

                return api[typeName].typeReference
              } else {
                run(result)

                api[typeName].typeReference = map[result].type[typeName]

                return api[typeName].typeReference
              }
            }
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
                importPath: node.moduleSpecifier.text,
              }

              return obj
            }, api)
          } else {
            // 命名导出
            const name = importClause.name.escapedText
            importPath[name] = {
              name,
              nameExport: true,
              importPath: node.moduleSpecifier.text,
            }
          }
          break
        case 'InterfaceDeclaration':
          // 继承的接口
          const extendsInterface = node.heritageClauses?.[0].types?.map(item => {
            return {
              name: item.expression.escapedText,
            }
          })

          api[node.name.escapedText] = {
            name: node.name.escapedText,
            code: content.substring(node.pos, node.end),
            extendProperty: extendsInterface?.reduce((total, current) => {
              return total.concat(api[current.name])
            }, []),
            property: node.members.map(item => {
              const type = content.substring(item.type.pos, item.type.end)
                            
              return {
                name: item.name.escapedText,
                type: type,
                required: item.questionToken ? false : true,
                defaultValue: undefined,
                typeReference: item.type.kind === 177 ? getType(filePath, item.type.typeName.escapedText) : undefined,
                jsDoc: ts.getJSDocTags(item).map(children => {
                  return {
                    tagName: children.tagName.escapedText,
                    content: children.comment,
                  }
                }),
              }
            }),
          }
          break
        case 'TypeAliasDeclaration':
          api[node.name.escapedText] = {
            name: node.name.escapedText,
            code: content.substring(node.pos, node.end),
          }
          break
        case 'FunctionDeclaration':
          exportList.push({
            exportDefault: isExportDefault(node),
            export: isExport(node),
            functionName: node.name.escapedText,
            args: node.parameters?.map(args => {
              const typeName =
                getDeclaration(args?.type?.kind) === 'TypetypeReference' ? args.type.typeName.escapedText : ''
              const type = api[typeName]

              return {
                name: args.name.escapedText,
                type,
              }
            }),
          })
          break
      }
    })

    map[filePath] = {
      type: api,
      importPath,
      exportList,
    }

  }

  run(filePath)

  return map
}

exports.transform = transform
