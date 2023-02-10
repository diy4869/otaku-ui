import MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import markdownItAnchor from 'markdown-it-anchor'
import matter from 'gray-matter'
import esbuild from 'esbuild'
// import parser from './compiler'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import path from 'path'


const libPath = path.resolve(__dirname, '../../otaku-ui')
const entryPath = path.resolve(libPath, './src/index.ts')
const { generatorAPI } = require('../../typescript-api-generator/src/index')
const { get } = require('./utils')
const parser = require('./compiler')


interface Anchor {
  tag: string
  level: number
  name: string
}
function reactCode (code: string, demoCode: string[], frontMatter, anchor: Anchor[]) {
  const importCode = frontMatter.import?.split(';').map(str => str.trimStart()).filter((item) => item).join('\n')

  const sourceCode = `
    import React from 'react'
    import Block from 'site-component/block/block'
    import { Api } from 'site-component/api/api'
    import { HighlightCode, Anchor, AnchorItem } from 'otaku-ui'
    import { CodeExample } from 'site-component/codeExample/codeExample'
    ${importCode}

    ${demoCode.join('\n')}
    
    export default function MarkDown () {
      return (
          <>
          <div className='markdown-body'>${code}</div>
            ${
              frontMatter.anchor ? '' :  `
              <Anchor target=".main">
                ${
                  anchor.reduce((str, item) => {
                    str += `<AnchorItem 
                      href={\`#${item.name.toLowerCase().replace(/ /g, '-')}\`}
                      title={\`${item.name}\`}></AnchorItem>`
                    
                    return str
                  }, '')
                }
              </Anchor>
            `
            }
        </>
      )
  }`

  const data = esbuild.transformSync(sourceCode, {
    loader: 'jsx'
  })
  // const test = transformSync(`<>${code}</>`, {
  //   presets: ['@babel/preset-react']
  // })

  // console.log(test)

  return data.code
}

export default () => {
  return {
    name: 'vite-plugin-md',
    // enforce: 'pre' as 'pre',
    transform (mdCode, path) {
      const reg = /\.md$/
      const { content, data } = matter(mdCode)

      let demoIndex = 0
      let demoCode = []
      let demoName
      

      if (reg.test(path)) {
        const md = new MarkdownIt({
          html: true,
          breaks: true,
          typographer: true,
          highlight (str, lang) {
            const template = `
                <HighlightCode
                  lang={\`${lang}\`}
                  code={\`${str}\`} 
                >
                </HighlightCode>
            `
            return template
          }
        })
        .use(markdownItAnchor, {
          level: [2, 3],
          permalink: markdownItAnchor.permalink.linkInsideHeader({
            symbol: `
                <span class="b-anchor"></span>
                <span aria-hidden="false">#</span>
              `,
            placement: 'before'
          })
        })
          .use(container, 'desc', {
            render (tokens, index) {
              if (tokens[index].nesting === 1) {
                return `<Block>`
              } else {
                // closing tag
                return '</Block>'
              }
            }
          })
          .use(container, 'api', {
            render (tokens, index) {
              if (tokens[index].nesting === 1) {
                const apiType = generatorAPI(entryPath)
          
                const findExport = () => {
                  return data.api.module.map(item => {
                    const filePath = Object.keys(apiType).find(children => {
                      if (apiType[children].export[item]) {
                        return true
                      }
                    })
      
                    return {
                      name: item,
                      type: filePath ? apiType[filePath].export[item].reference : null
                    }
                  })
                }
                const result = findExport()
                const interfaceCode = []
                const typeCode = []
                const apiData = []
                
                const appendType = (property) => {
                  const find = property.find(item => item.typeReference)
      
                  if (find) {
                    find.typeReference.type === 'interface' ? interfaceCode.push(find.typeReference.code) : typeCode.push(find.typeReference.code)
                  }
                }
      
                result.forEach(item => {
                  const type = item.type?.args?.[0].type
      
                  if (type.type === 'interface') {
                    if (type.extendProperty) {
                      type.extendProperty.forEach(children => {
                        appendType(children.property)
                        interfaceCode.push(children.code)
                      })
                      
                    }
                    appendType(type.property)
                    interfaceCode.push(type.code)
                    apiData.push({
                      name: item.name,
                      data: type.property
                    })
                  }
                  if (type.type === 'type') {
                    type.typeReference.map(children => {
                      if (children.type === 'typeInterface') {
                        appendType(children.property)
                        apiData.push({
                          name: item.name,
                          data: children.property
                        })
                        interfaceCode.push()
                      }
                      if (children.type === 'reference') {
                        typeCode.push(children.reference.code)
                      }
                    })
                    typeCode.push(type.code)
                  }
                })
      
                const header = ['属性', '是否必填', '类型', '默认值', '描述']
                const html = apiData.reduce((str, current) => {
                  const { data } = current
                  const table = `
                    <tr>
                      ${header.map(item => `<th>${item}</th>`).join('')}
                    </tr>
                    ${
                      data?.map(children => {
                        return `
                          <tr>
                            <td>${children.name}</td>
                            <td>${children.required ? '是' : '否'}</td>
                            <td>${children.type}</td>
                            <td>${children.defaultValue || ''}</td>
                            <td>这是个描述</td>
                          </tr>
                        `
                      }).join('')
                    }
                  `
                  
                  str += `<h2>${current.name}</h2><table>${table}</table>` + '\n'
      
                  return str
                }, '')
                
                const code = typeCode.join('\n\n') + interfaceCode.join('\n\n')
                return `<>
                  <Api 
                    code={\`${code}\`}
                    html={\`${html}\`}
                    ></Api>`
              } else {
                return `</>`
              }
            }
          })
          .use(container, 'demo', {
            render (tokens, index) {
              if (tokens[index].nesting === 1) {
                const map = get(tokens, index)
                const current = map.get(index)
                const ast = parser(current.code)
      
                traverse(ast, {
                  FunctionDeclaration (path) {
                    const node = path.node
                    const name = node.id.name
                    demoName = name
                    path.node.id.name = `${name}${demoIndex}`
                  },
                  JSXIdentifier (path) {
                    if (path.node.name === demoName) {
                      path.node.name = `${demoName}${demoIndex++}`
                    }
                  }
                })
      
                // console.log(ast)
                const { code } = generate(ast, {
                  retainLines: true
                })
      
                const generatorAST = parser(code)
      
                traverse(generatorAST, {
                  FunctionDeclaration (path) {
                    const node = path.node
                    const injectCode = code.substring(node.start, node.end)
                    // console.log(injectCode)
                    demoCode.push(injectCode)
                    // current.code = `${${current.code}`
                  },
                  CallExpression (path) {
                    const callee = path.node.callee
                    const objectName = callee?.object?.name
                    const propertyName = callee?.property?.name
      
                    if (propertyName === 'render') {
                      const args = path.node.arguments
                      const [example, container] = args
                      const exampleCode = code.substring(example.start, example.end)
      
                      current.example = `<>
                        <style>{\`${current.style.code}\`}</style>
                        ${exampleCode}
                      </>`
                    }
                  }
                })
                
                const importCode = data.import.split(';').map(str => str.trimStart()).filter((item) => item)
      
                return `
                  <CodeExample
                    desc={\`${current.desc}\`}
                    lang={\`${current?.lang}\`}
                    example={${current.example}}
                    code={\`${
                        [
                          importCode.join('\n'),
                          '\n' + current.code
                        ].join('\n')}\`}
                    style={{
                      lang: \`${current.style.lang}\`,
                      code: \`${current.style.code}\`
                    }}
                  >
                `
              } else {
                return '</CodeExample>'
              }
            }
          })
        
          const ast = md.parse(content, {})
          const anchor = ast.reduce((total, current, currentIndex) => {
            if (current.type === 'heading_open') {
              total.push({
                tag: current.tag,
                level: current.markup.length,
                name: ast[currentIndex + 1].content
              })
            }

            return total
          }, [])
        const code = md
          .render(content)
          .replace(/(tabindex)/g, 'tabIndex')
          .replace(/<hr>/g, '<hr />')
          .replace(/<br>/g, '<br />')
          .replace(/class=/g, 'className=')

        return {
          code: reactCode(code, demoCode, data, anchor)
        }
      }
    }
  }
}
