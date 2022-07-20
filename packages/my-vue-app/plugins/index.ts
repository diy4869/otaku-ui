import MarkdownIt from 'markdown-it'
import contaier from 'markdown-it-container'
import react from '@vitejs/plugin-react'

function reactCode (code: string) {
  return `export default function MarkDown () {
      return (
        <section className="markdown-container">
          ${code}
        </section>
      )
  }`
}

export default (options) => {
  return {
    name: 'vite-plugin-md',
    // enforce: 'pre',
    resolveId (id) {
      console.log(id)
      return id
    },
    transform (content, path) {
      const reg = /\.md$/

      if (reg.test(path)) {
        const code = new MarkdownIt().render(content)

        return {
          code: reactCode(code)
        }
      }
    }
  }
}
