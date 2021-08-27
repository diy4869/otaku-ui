const MarkdownIt = require('markdown-it')
const { transformSync } = require('@babel/core')
const hlsjs = require('highlight.js')

module.exports = function mdLoader (source) {
  const md = new MarkdownIt({
    highlight(str, lang) {
      console.log('--------\n')
      console.log(str, lang)
      if (lang && hlsjs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hlsjs.highlight(str, {
              language: lang,
              ignoreIllegals: true
            }).value +
            '</code></pre>'
          )
        } catch (__) {}
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'

      const { code } = transformSync(str, {
        sourceType: 'module',
        presets: [
          [
            '@babel/preset-react'
          ]
        ]
      })

      console.log(code)

      return `
        function Example () {
          return (
            <div class="code-example">
              ${str}
            </div>
          )
        }
      `

    }

  })

  const render = md.render(source)
  console.log(render)
  return render
}
