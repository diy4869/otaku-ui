const MarkdownIt = require('markdown-it')
const container = require('markdown-it-container')
const matter = require('gray-matter')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-toc-done-right')
const parser = require('./compiler/parser')
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
          const map = get(tokens)
         
          const current = map.get(index) // <>${current?.code}</>
          const ast = parser(current.code)
          console.log(ast)
          const code = `
            ${data.import}

            ${current.code}
          `
          return `
            <CodeExample
              desc={\`hello world\`}
              lang={\`${current?.lang}\`}
              example={<>${current?.code}</>}
              code={\`${code}\`}
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

  console.log(str)

  return reactMarkdownTemplate(data.import, mdToHtml)
}
