import React, { useState, useLayoutEffect } from 'react'
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/vs.css'
import './style.scss'

export interface HighlightCodeProps {
  lang: string
  code: string
}

export function HighlightCode (props: HighlightCodeProps) {
  const { lang, code } = props
  const [highlightCode, setHighLightCode] = useState('')

  useLayoutEffect(() => {
    const res = hljs.highlight(code, {
      language: lang,
      ignoreIllegals: true
    }).value

    setHighLightCode(res)
  }, [lang, code])

  return (
    <div className='otaku-code-container'>
      <div className='otaku-code-lang'>{lang}</div>
      <pre>
        <code
          className='otaku-code'
          dangerouslySetInnerHTML={{
            __html: highlightCode
          }}></code>
      </pre>
    </div>
  )
}
