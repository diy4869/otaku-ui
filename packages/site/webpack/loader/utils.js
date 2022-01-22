
const ts = require('typescript')
const fs = require('fs')
const enhancedResolve = require('enhanced-resolve')

const get = (tokens, index) => {
  const map = new Map()
  let startIndex = undefined

  for (let i = 0; i < tokens.length; i++) {
    const start =
      tokens[i].nesting === 1 && tokens[i].type === 'container_demo_open'
    const end =
      tokens[i].nesting === -1 && tokens[i].type === 'container_demo_close'
    const desc = tokens[index + 2].content.replace(/\n/g, '<br/>')

    if (start) {
      startIndex = i
      map.set(i, undefined)
    }

    if (end) {
      const endIndex = i
      const data = {
        code: '',
        lang: '',
        desc: desc,
        example: '',
        style: {
          lang: 'css',
          code: ''
        },
        end: endIndex
      }

      for (let j = startIndex; j < endIndex; j++) {
        if (tokens[j].type === 'fence') {
          if (['tsx', 'jsx'].includes(tokens[j].info)) {
            data.lang = tokens[j].info
            data.code = tokens[j].content
          }
          if (['css', 'scss'].includes(tokens[j].info)) {
            data.style.lang = tokens[j].info
            data.style.code = tokens[j].content
          }
        }
      }

      data.example = data.example ? data.example : data.code

      map.set(startIndex, data)
    }
  }

  return map
}

const getDeclaration = kind => ts.SyntaxKind[kind]
const isExport = node => {
  node.modifiers?.length === 1 &&
  getDeclaration(node.modifiers[0].kind)  === 'ExportKeyword'
}

const isExportDefault = node => {
  node.modifiers?.length === 2 && 
  getDeclaration(node.modifiers[0].kind)  === 'ExportKeyword' && 
  getDeclaration(node.modifiers[0].kind)  === 'DefaultKeyword'
}

const readFile = path => {
  return fs.readFileSync(path, {
    encoding: 'utf-8'
  })
}

const parser = (filename, content) => {
  return ts.createSourceFile(filename, content, ts.ScriptTarget.ESNext, true)
}

const getAbsolutePath = (basePath, relativePath) => {
  const parserPath = enhancedResolve.create.sync({
    extensions: ['.ts', '.tsx', '.js'],
  })

  const absolutePath = parserPath({
    resolveToContext: true,
    mainFields: ['main', 'exports']
  }, basePath, relativePath, {})

  return absolutePath
}

exports.get = get
exports.getDeclaration = getDeclaration
exports.isExport = isExport
exports.isExportDefault = isExportDefault
exports.parser = parser
exports.readFile =  readFile
exports.getAbsolutePath = getAbsolutePath



