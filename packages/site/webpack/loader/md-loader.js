const MarkdownIt = require('markdown-it')
const container = require('markdown-it-container')
const matter = require('gray-matter')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-toc-done-right')
const parser = require('./compiler')
const traverse = require('@babel/traverse').default
const types = require('@babel/types')
const generate = require('@babel/generator').default
const { get } = require('./utils')


let str = `
  import * as React from 'react'
  import Block from 'Block'
  import { CodeExample } from 'CodeExample'
  import { HighlightCode } from 'otaku-ui'

`
const reactMarkdownTemplate = (importSynx, content) => {
  const data = `
    ${str}
    ${importSynx}

    function MdReact () {
      return <div className='b-md-container markdown-body'>${content}</div>
    }

    export default MdReact
  `

  return data
}


module.exports = function mdLoader(source) {
  const { content, data } = matter(source)

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
      render(tokens, index) {
        if (tokens[index].nesting === 1) {
          const map = get(tokens, index)
         
          const current = map.get(index) // <>${current?.code}</>
          const ast = parser(current.code)


          traverse(ast, {
            FunctionDeclaration (path) {
              const node = path.node
              const name = node.id.name
              demoName = name
              path.node.id.name = `${name}${index}`

            },
            JSXIdentifier(path) {
              if (path.node.name === demoName) {

                path.node.name = `${demoName}${index++}`
              }
            }
          })

          // const  = generate(ast)

          current.code = `${data.import}

${current.code}
          `

          console.log(current)
          return `
            <CodeExample
              desc={\`${current.desc}\`}
              lang={\`${current?.lang}\`}
              example={\`hello world \`}
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



  return reactMarkdownTemplate(data.import, mdToHtml)
}
