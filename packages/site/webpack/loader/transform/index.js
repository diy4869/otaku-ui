const {
  getDeclaration,
  isExport,
  isExportDefault,
  readFile,
  parser,
  getAbsolutePath
} = require('../utils')
const ts = require('typescript')
const path = require('path')
const fs = require('fs')

const { promisify } = require('util')

/**
 *
 * @param {string} currentPath 当前的文件
 * @param {string} typeName 当前文件引用到的类型
 * @returns
 */
const getReferenceType = (typeName, fileMap) => {
  if (!typeName) return

  const type = fileMap.type[typeName]

  if (type) return type
  // 说明是引入的
  const absolutePath = fileMap.import[typeName].importPath
  if (absolutePath) {
    if (absolutePath.includes('node_modules')) {
      return 'node_modules'
    }
    // 判断该文件时否已经被解析过
    if (map[absolutePath]) {
      fileMap.type[typeName].typeReference = map[absolutePath].type[typeName]

      return fileMap.type[typeName].typeReference
    } else {
      run(absolutePath)

      fileMap.import[typeName].typeReference = map[absolutePath].type[typeName]

      return fileMap.import[typeName].typeReference
    }
  }
}

const transformArgs = (node, fileMap) => {
  return node.parameters?.map(args => {
    const typeName = args?.type?.kind === 177
        ? getReferenceType(args.type.typeName.escapedText, fileMap)
        : ''

    return {
      name: args.name.escapedText,
      type: typeName
    }
  })
}

const isFunction = (node, fileMap) => {
  const isVariableFunction = node => {
    const initializer = node?.declarationList?.declarations?.[0]?.initializer

    if (initializer) {
      if (ts.isArrowFunction(initializer)) {
        return initializer
      }

      return false
    }
    return false
  }

  const isArrowFunction = ts.isArrowFunction(node)
  const isFunctionExpression = ts.isFunctionExpression(node)
  // const isFunctionLike = ts.isFunctionLike(node)
  const isVariFunctionNode = isVariableFunction(node)

  if (isVariFunctionNode) {
    const functionName = isVariFunctionNode.parent.name.escapedText

    fileMap.function[functionName] = {
      export: isExport(node),
      functionName: functionName,
      arrowFunction: ts.isArrowFunction(isVariFunctionNode),
      asyncFunction: ts.isAsyncFunction(isVariFunctionNode),
      args: transformArgs(isVariFunctionNode, fileMap)
    }

    return isVariFunctionNode
  } else if (ts.isFunctionDeclaration(node)) {
    // 普通函数
    return node
  } else if (isArrowFunction) {
    return isArrowFunction
  } else if (isFunctionExpression) {
    return isFunctionExpression
  }
}

const transform = (filePath, map = {}) => {
  // console.log(ts.resolve, filePath)
  // 存放每个文件的解析结果
  // const map = {}
  /**
   *
   * @param {*} filePath 当前的文件路径
   * @param {*} refererPath 引用的文件路径
   * @returns
   */
  const run = filePath => {
    if (map[filePath]) return
    if (filePath.includes('.scss')) return
    if (filePath.includes('node_modules')) return

    const content = readFile(filePath)
    const ast = parser(filePath, content)

    const fileMap = {
      // 定义的类型
      type: {},
      import: {},
      function: {}
    }

    ast.forEachChild(node => {
      const type = getDeclaration(node.kind)
      // isFunction(node, fileMap)

      switch (type) {
        case 'ImportDeclaration':
          if (!node.importClause) return

          const importClause = node.importClause
          const importPath = path.resolve(filePath, '../')
          const absolutePath = getAbsolutePath(
            importPath,
            node.moduleSpecifier.text
          )
          console.log(absolutePath)
          if (absolutePath.includes('.scss')) return
          if (importClause?.namedBindings) {
            // 解构引入
            importClause.namedBindings.elements.reduce((obj, current) => {
              obj[current.name.escapedText] = {
                // 解构
                deconstruct: true,
                // 默认导出的
                default: importClause.name
                  ? importClause.name.escapedText
                  : undefined,
                name: current.name.escapedText,
                importPath: absolutePath
              }

              return obj
            }, fileMap.import)
          } else {
            // 命名导出
            const name = importClause.name.escapedText
            fileMap.import[name] = {
              name,
              nameExport: true,
              importPath: node.moduleSpecifier.text
            }
          }
          break
        case 'InterfaceDeclaration':
          // 继承的接口
          const extendsInterface = node.heritageClauses?.[0].types?.map(
            item => {
              return {
                name: item.expression.escapedText
              }
            }
          )

          fileMap.type[node.name.escapedText] = {
            type: 'interface',
            name: node.name.escapedText,
            code: content.substring(node.pos, node.end),
            extendProperty: extendsInterface?.reduce((total, current) => {
              return total.concat(fileMap.type[current.name])
            }, []),
            property: node.members.map(item => {
              const type = content.substring(item.type.pos, item.type.end)

              return {
                name: item.name.escapedText,
                type: type,
                required: item.questionToken ? false : true,
                defaultValue: undefined,
                typeReference:
                  item.type.kind === 177
                    ? getReferenceType(item.type.typeName.escapedText, fileMap)
                    : undefined,
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
          fileMap.type[node.name.escapedText] = {
            type: 'type',
            name: node.name.escapedText,
            code: content.substring(node.pos, node.end)
          }
          break
        case 'FunctionDeclaration':
          fileMap.function[node.name.escapedText] = {
            exportDefault: isExportDefault(node),
            export: isExport(node),
            functionName: node.name.escapedText,
            args: transformArgs(node, fileMap)
          }
          break
        default:
          isFunction(node, fileMap)
          break
      }
    })

    map[filePath] = fileMap
  }

  run(filePath)

  return map
}

exports.transform = transform
