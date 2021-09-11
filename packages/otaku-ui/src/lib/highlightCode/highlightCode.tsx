import React, { useState, useLayoutEffect } from 'react'
import './style.scss'
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/vs.css'

export interface HighlightCodeProps {
  lang: string
  code: string
}

export function HighlightCode (props: HighlightCodeProps) {
  const {
    lang = 'typescript',
    code
  } = props
  const [highlightCode, setHighLightCode] = useState('')

  // try {
  //   hljs.registerLanguage(lang, require(`highlight.js/lib/languages/${lang}`))
  // } catch (err) {

  // }
  

  useLayoutEffect(() => {
      const res = hljs.highlight(code, {
        language: lang,
        ignoreIllegals: true
      }).value

      // console.log(lang, res)
      setHighLightCode(res)
  })

  return (
    <div className="otaku-code-container">
      <pre>
        <code className="otaku-code"
          dangerouslySetInnerHTML={{
            __html: highlightCode
          }}>
        </code>
      </pre>
    </div>
  )
}
