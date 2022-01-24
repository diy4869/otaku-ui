const MarkdownIt = require('markdown-it')
const container = require('markdown-it-container')
const matter = require('gray-matter')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-toc-done-right')
const parser = require('./compiler')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const { get } = require('./utils')
const transform = require('./generator/index')
const json5 = require('json5')

let importSynx = `
  import * as React from 'react'
  import { HighlightCode } from 'otaku-ui'
  import { Api } from 'site-component/api/api'
  import { CodeExample } from 'site-component/codeExample/codeExample'
  import Block from 'site-component/block/block'
`
let str = importSynx

const reactMarkdownTemplate = (str, importSynx, content) => {
  const data = `
    ${importSynx}
    ${str}

    function MdReact () {
      return <div className='markdown-body'>${content}</div>
    }

    export default MdReact
  `

  return data
}

module.exports = function mdLoader (source) {
  const { content, data } = matter(source)

  let apiType
  
  if (this.hot) {
    str = importSynx
    if (data.api) {
      const path = 'D:\\code\\otaku-ui\\packages\\otaku-ui\\src\\lib\\button\\button.tsx'
      apiType = transform(path, {}) 
    }

    //   // console.log(this.resourcePath)
    // this.addDependency(this.resourcePath)
  }
  // demo 数量
  let demoIndex = 0
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
    .use(anchor, {
      level: 3,
      permalink: anchor.permalink.linkInsideHeader({
        symbol: `
            <span class="b-anchor"></span>
            <span aria-hidden="false">#</span>
          `,
        placement: 'before'
      })
    })
    .use(toc, {
      level: 2
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
          const fileData = Object.values(apiType)[0]        
          const result = data.api.module.map(component => {
            return fileData.function[component]
          })

          const renderComponent = result.reduce((str, current, index) => {

            const interface = current.args[0].type

            str.push( ` <Api 
              code={\`${interface.code}\`}
              data={\`${json5.stringify(interface.property)}\`}
              ></Api>`)



            return str
          }, [])

          console.log(renderComponent)

          
          // console.log( `<>${renderComponent}`)
          return `<>
          { 
            ${renderComponent}
          }`
        
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
              code={\`${current.code}\`}
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

  const mdToHtml = md
    .render(content)
    .replace(/<hr>/g, '<hr />')
    .replace(/<br>/g, '<br />')
    .replace(/class=/g, 'className=')

  return reactMarkdownTemplate(str, data.import, mdToHtml)
}
