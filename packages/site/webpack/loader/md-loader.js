const MarkdownIt = require('markdown-it')
const container = require('markdown-it-container')
const matter = require('gray-matter')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-toc-done-right')
const parser = require('./compiler')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const { get } = require('./utils')

let importSynx = `
  import * as React from 'react'
  import Block from 'Block'
  import { CodeExample } from 'CodeExample'
  import { HighlightCode } from 'otaku-ui'
`
let str = importSynx

const reactMarkdownTemplate = (str, importSynx, content) => {
  const data = `
    ${importSynx}
    ${str}

    function MdReact () {
      return <div className='b-md-container markdown-body'>${content}</div>
    }

    export default MdReact
  `

  return data
}

module.exports = function mdLoader (source) {
  const { content, data } = matter(source)

  if (this.hot) {
    str = importSynx
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
    .use(container, 'demo', {
      render (tokens, index) {
        if (tokens[index].nesting === 1) {
          const map = get(tokens, index)

          const current = map.get(index) // <>${current?.code}</>
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

          const { code } = generate(ast, {
            retainLines: true
          })
          const search = code.indexOf('ReactDOM')
          const injectCode = code.substr(0, search)
          const exampleCode = code
            .substr(search)
            .split(',')[0]
            .split('(')[1]

          str += `
${injectCode}
`
          current.code = `${data.import}

${current.code}
          `
          current.example = `<>
            <style>{\`${current.style.code}\`}</style>
            ${exampleCode}
          </>`

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
