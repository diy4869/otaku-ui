const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')
const React = require('react')
const ReactDomServer = require('react-dom/server')
const container = require('markdown-it-container')
const matter = require('gray-matter')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-toc-done-right')

const reactMarkdownTemplate = (importSynx, content) => {
  return `
    import * as React from 'react'
    import { CodeExample } from 'CodeExample'
    ${importSynx}

    function MdReact () {
      return <div className='b-md-container'>${content}</div>
    }

    export default MdReact
  `
}

module.exports = function mdLoader (source) {
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    quotes: true,
    highlight(str, lang) {

      const template = `
          <CodeExample
            code={\`${str}\`} 
          >
          </CodeExample>
      `
      // process.exit()

      console.log(template)
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
          var m = tokens[index].info.trim().match(/^demo\s+(.*)$/)

          const code = `${tokens[index + 2]?.content}`

          console.log('container', m, '======', code)
          if (tokens[index].nesting === 1) {
            // opening tag

            return `<CodeExample>
              {"${code}"}`
          } else {
            // closing tag
            return '</CodeExample>\n'
          }

      }
    })
    .use(container, 'demo', {
      render (tokens, index) {
        var m = tokens[index].info.trim().match(/^demo\s+(.*)$/)

        const code = `${tokens[index + 2]?.content}`

        console.log('container', m, '======', code)
        if (tokens[index].nesting === 1) {
          // opening tag

          return `<CodeExample>
            {"${code}"}`
        } else {
          // closing tag
          return '</CodeExample>\n'
        }

      }
    })

  const { content, data } = matter(source)

  console.log(content)
  console.log(md.render(content))
  const mdToHtml = md
    .render(content)
    .replace(/<hr>/g, '<hr />')
    .replace(/<br>/g, '<br />')
    .replace(/class=/g, 'className=')


  return reactMarkdownTemplate(data.import, mdToHtml)
}
