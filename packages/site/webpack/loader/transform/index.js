const ts = require('typescript')
const path = require('path')
const {
  getDeclaration,
  isExport,
  isExportDefault,
  readFile,
  parser,
  backPath,
  getAbsolutePath
} = require('../utils')

const setDefaultValue = (node, currentFile, content) => {
  node.body.forEachChild(current => {
    const declarations = current?.declarationList?.declarations?.[0]

    if (declarations?.initializer) {
      const fnName = node?.name?.escapedText || node.parent.name.escapedText
      const fn = currentFile?.function[fnName]
      const args = fn?.args?.[0]
      const propsName = node.parameters?.[0]?.name.escapedText

      const init = (property) => {
        property.map(item => {
          const property = declarations?.name?.elements?.find(children => children.name.escapedText === item.name)

          if (property) {
            item.defaultValue = property.initializer 
              ? property.initializer.text : undefined
            // item.defaultValue = property.initializer 
            //   ? content.substring(property.initializer.pos, property.initializer.end) : undefined
          }

          return item
        })
      }

      if  (args.name === propsName) {
        if (args?.type?.extendProperty) {
          init(args.type.extendProperty)
        } 

        if (args?.type?.property) {
          init(args.type.property)
        }
      }
    }
  })
}
/**
   *
   * @param {*} filePath 当前的文件路径
   * @param {*} refererPath 引用的文件路径
   * @returns
   */
const run = (filePath, fileMap) => {
  if (fileMap[filePath]) return
  if (filePath.includes('.scss')) return
  if (filePath.includes('node_modules')) return

  const content = readFile(filePath)
  const ast = parser(filePath, content)

  const currentFile = {
    // 定义的类型
    type: {},
    import: {},
    function: {},
    // 普通 export 导出的，目前只有函数 会去记录， export {} 这种 无法拿到类型
    export: {},
    // export * from 导出的内容
    exportFile: {}
  }

  ast.forEachChild(node => {
    const type = getDeclaration(node.kind)
    // isFunction(node, currentFile)
    

    switch (type) {
      case 'ExportDeclaration':
        /**
         * 由于传入的是绝对路径，所以这里需要后退到对应的相对路径，
         * 从而获取到引入的模块绝对路径，主要是因为 enhance-resolve 解析报错
         */ 

        if (node.exportClause) {
          node.exportClause.elements.reduce((obj, current) => {
            obj[current.name.escapedText] = {
              type: undefined
            }

            return obj
          }, currentFile.export)
        } else {
          const value = node.moduleSpecifier.text
          const relativePath = backPath(filePath, value)
          const exportPath = getAbsolutePath(relativePath, value)

          transform(exportPath, fileMap)
          currentFile.exportFile[exportPath] = fileMap[exportPath]
        }
       
        break
      case 'ImportDeclaration':
        if (!node.importClause) return

        const importClause = node.importClause
        const importPath = path.resolve(filePath, '../')
        const absolutePath = getAbsolutePath(
          importPath,
          node.moduleSpecifier.text
        )
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
          }, currentFile.import)

          run(absolutePath, fileMap)
        } else {
          // 命名导出
          const name = importClause.name.escapedText
          currentFile.import[name] = {
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

        currentFile.type[node.name.escapedText] = {
          type: 'interface',
          export: isExport(node),
          exportDefault: isExportDefault(node),
          name: node.name.escapedText,
          code: content.substring(node.pos, node.end).trimStart(),
          extendProperty: extendsInterface?.reduce((total, current) => {
            // 当前文件定义的类型
            if (currentFile.type[current.name]) {
              return total.concat(currentFile.type[current.name])
            } else {
              // 引入的类型
              const importType = currentFile.import[current.name]

              if (importType) {
                const referer = fileMap[importType.importPath]
                if (referer.type[current.name]) {
                  const type = referer.type[current.name]

                  return total.concat(type)
                } else {
                  const result = Object.keys(referer.exportFile).find(file => {
                    return Object.keys(fileMap[file].type).some(typeName => typeName === current.name)
                  })

                  if (result) return total.concat(
                    fileMap[result].type[current.name]
                  )
                }
              }
            }
           
          }, []),
          property: node.members.map(item => {
            const type = content
              .substring(item.type.pos, item.type.end)
              .trimStart()

            return {
              name: item.name.escapedText,
              type: type,
              required: item.questionToken ? false : true,
              defaultValue: undefined,
              typeReference:
                item.type.kind === 177
                  ? getReferenceType(item.type.typeName.escapedText, currentFile, fileMap)
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
        saveExport(node, node.name.escapedText, currentFile, 'interface')
        break
      case 'TypeAliasDeclaration':
        currentFile.type[node.name.escapedText] = {
          type: 'type',
          name: node.name.escapedText,
          export: isExport(node),
          exportDefault: isExportDefault(node),
          code: content.substring(node.pos, node.end).trimStart(),
          typeReference: node.type.types.reduce((arr, current) => {
            if (current.kind === 197) {
              current.templateSpans.forEach(children => {
                if (children.type.kind === 177) {
                  const referenceName = children.type.typeName.escapedText

                  if (currentFile.type[referenceName]) {
                    const find = arr.find(item => item.name === referenceName)
                    if (!find) arr.push(currentFile.type[referenceName])
                    return arr
                  }
                }
              })
            }
            if (current.kind === 177) {
              // 是否已经添加过
              const find = arr.find(item => item.name === current.typeName.escapedText)
              if (find) return arr
            }

            return arr
          }, [])
        }
        saveExport(node, node.name.escapedText, currentFile, 'type')
        break
      case 'FunctionDeclaration':
        currentFile.function[node.name.escapedText] = {
          exportDefault: isExportDefault(node),
          export: isExport(node),
          functionName: node.name.escapedText,
          args: transformArgs(node, currentFile, fileMap)
        }
        setDefaultValue(node, currentFile, content)
        saveExport(node, node.name.escapedText, currentFile, 'function')
        break
      default:
        isFunction(node, currentFile, fileMap, content)
        break
    }
  })

  fileMap[filePath] = currentFile
}

/**
 *
 * @param {string} currentPath 当前的文件
 * @param {string} typeName 当前文件引用到的类型
 * @returns
 */
const getReferenceType = (typeName, currentFile, fileMap) => {
  if (!typeName) return

  if (currentFile.type[typeName]) {
    return currentFile.type[typeName]
  } else if (currentFile.import[typeName]) {
    // 说明是引入的
    const absolutePath = currentFile.import[typeName].importPath
    if (absolutePath) {
      if (absolutePath.includes('node_modules')) {
        return 'node_modules'
      }
      // 判断该文件时否已经被解析过
      if (currentFile[absolutePath]) {
        currentFile.type[typeName].typeReference = currentFile[absolutePath].type[typeName]

        return currentFile.type[typeName].typeReference
      } else {
        run(absolutePath, fileMap)

        currentFile.import[typeName].typeReference = fileMap[absolutePath].type[typeName]

        return currentFile.import[typeName].typeReference
      }
    }
  } else {
    // 都不存在
    return typeName
  }
  
}

const saveExport = (node, name, currentFile, type) => {
  const getReferenceType = (type) => {
    switch (type) {
      case 'function':
        return currentFile.function[name]
      case 'interface':
        return currentFile.type[name]
      case 'type':
        return currentFile.type[name]
      default:
        return null
    }
  }
  
  if (isExportDefault(node)) {
    currentFile.export.default = {
      type: type,
      reference: getReferenceType(type) 
    }
  } else if (isExport(node)) {
    currentFile.export[name] = {
      type: type,
      reference: getReferenceType(type) 
    }
  }
}

const transformArgs = (node, currentFile, fileMap) => {
  return node.parameters?.map(args => {
    const typeName = args?.type?.kind === 177
        ? getReferenceType(args.type.typeName.escapedText, currentFile, fileMap)
        : ''

    return {
      name: args.name.escapedText,
      type: typeName
    }
  })
}

const isFunction = (node, currentFile, fileMap, content) => {
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

    currentFile.function[functionName] = {
      export: isExport(node),
      functionName: functionName,
      arrowFunction: ts.isArrowFunction(isVariFunctionNode),
      asyncFunction: ts.isAsyncFunction(isVariFunctionNode),
      args: transformArgs(isVariFunctionNode, currentFile, fileMap)
    }

    setDefaultValue(isVariFunctionNode, currentFile, content)
    saveExport(node, functionName, currentFile, 'function')

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
  run(filePath, map)

  return map
}

exports.transform = transform
