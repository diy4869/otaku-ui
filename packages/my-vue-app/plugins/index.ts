import MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import markdownItAnchor from 'markdown-it-anchor'
import {transformSync } from '@babel/core'
import esbuild from 'esbuild'

function reactCode (code: string) {
  const sourceCode = `
    import React from 'react'
    import Block from 'site-component/block/block'
    import { Api } from 'site-component/api/api'
    import { HighlightCode, Anchor, AnchorItem } from 'otaku-ui'
    import { CodeExample } from 'site-component/codeExample/codeExample'

    export default function MarkDown () {
      return (
          <section className="markdown-container">
          ${code}
        </section>
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
    transform (content, path) {
      const reg = /\.md$/


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

        const code = md
          .render(content)
          .replace(/(tabindex)/g, 'tabIndex')
          .replace(/<hr>/g, '<hr />')
          .replace(/<br>/g, '<br />')
          .replace(/class=/g, 'className=')

        return {
          code: reactCode(code)
        }
      }
    }
  }
}
