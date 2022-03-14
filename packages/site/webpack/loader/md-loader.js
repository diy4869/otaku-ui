const MarkdownIt = require('markdown-it')
const container = require('markdown-it-container')

const matter = require('gray-matter')
const parser = require('./compiler')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const { get } = require('./utils')
const markdownItAnchor = require('markdown-it-anchor')
const { transform, transformAll } = require('./generator/index')
const json5 = require('json5')

let importSynx = `
  import * as React from 'react'
  import { HighlightCode, Anchor, AnchorItem } from 'otaku-ui'
  import { Api } from 'site-component/api/api'
  import { createPortal } from 'react-dom'
  import { CodeExample } from 'site-component/codeExample/codeExample'
  import Block from 'site-component/block/block'
`

let str = importSynx
let demoIndex = 0


module.exports = function mdLoader (source) {
  const { content, data } = matter(source)

  if (this.hot) {
    str = importSynx

    //   // console.log(this.resourcePath)
    // this.addDependency(this.resourcePath)
  }
  // demo 数量

  let demoName

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
      // process.exit()
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
          // opening tag
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
          const apiType = transformAll()
    
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
          const interface = []
          const type = []
          const apiData = []
          const property = []

          
          const appendType = (property) => {
            const find = property.find(property => property.typeReference)

            if (find) {
              find.typeReference.type === 'interface' ? interface.push(find.typeReference.code) : type.push(find.typeReference.code)
            }
          }

          result.forEach(item => {
            const type = item.type.args[0].type

            if (type.type === 'interface') {
              if (type.extendProperty) {
                type.extendProperty.forEach(children => {
                  appendType(children.property)
                  interface.push(children.code)
                })
                
              }
              appendType(type.property)
              interface.push(type.code)
            }


            apiData.push({
              name: json5.stringify(item.name),
              data: json5.stringify(type.property)
            })

          })
          // console.log(interface)

          
          return `<>
            <Api 
              code={\`${interface.join('\n\n')}\`}
              data={\`${JSON.stringify(apiData)}\`}
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

          // const result = transformSync(code, {
          //   // sourceType: 'module',
          //   filename: 'test.js',
          //   presets: [
          //     '@babel/preset-env',

          //     '@babel/preset-react',
          //     '@babel/preset-typescript',
          //   ],
          //   // plugins: [
          //   //   // '@babel/plugin-syntax-typescript',
          //   //   '@babel/plugin-transform-typescript',
          //   //   '@babel/plugin-syntax-jsx'
          //   // ]
          // })
          // console.log(result)
          const generatorAST = parser(code)

          traverse(generatorAST, {
            FunctionDeclaration (path) {
              const node = path.node
              const injectCode = code.substring(node.start, node.end)
              // console.log(injectCode)
              str += `
${injectCode}
`
              current.code = `${data.import}

${current.code}`
            },
            CallExpression (path) {
              const callee = path.node.callee
              const objectName = callee?.object?.name
              const propertyName = callee?.property?.name

              if (objectName === 'ReactDOM' && propertyName === 'render') {
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

          return `
            <CodeExample
              desc={\`${current.desc}\`}
              lang={\`${current?.lang}\`}
              example={${current.example}}
              code={\`${[data.import, current.code].join('\n\n')}\`}
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


  const mdToHtml = md
    .render(content)
    .replace(/<hr>/g, '<hr />')
    .replace(/<br>/g, '<br />')
    .replace(/class=/g, 'className=')


  const reactMarkdownTemplate = (str, data, content, anchor) => {
      return `
        ${data.import}
        ${str}
    
        function MdReact () {
          return (
            <>
              <div className='markdown-body'>${content}</div>
              ${
                data.anchor ? '' :  `
                <Anchor>
                  ${
                    anchor.reduce((str, item) => {
                      str += `<AnchorItem title={\`${item.name}\`}></AnchorItem>`
                      
                      return str
                    }, '')
                  }
                </Anchor>
              `
              }
            </>
          )
        }
    
        export default MdReact
      `
  }

  return  reactMarkdownTemplate(str, data, mdToHtml, anchor)
}
