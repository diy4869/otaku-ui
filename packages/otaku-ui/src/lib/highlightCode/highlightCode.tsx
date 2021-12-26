import React, { useState, useLayoutEffect } from 'react'
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/vs.css'
import './style.scss'

export interface HighlightCodeProps {
  lang: string
  code: string
  showLine?: boolean
}

export function HighlightCode (props: HighlightCodeProps) {
  const { lang, code, showLine } = props
  const [highlightCode, setHighLightCode] = useState('')
  const [line, setLine] = useState(0)

  useLayoutEffect(() => {
    const res = hljs.highlight(code, {
      language: lang,
      ignoreIllegals: true
    }).value

    setLine(code.split('\n').length)
    setHighLightCode(res)
  }, [lang, code])

  return (
    <div className='otaku-code-container'>
      <div className='otaku-code-lang'>{lang}</div>
      {
        showLine && <ul className="otaku-code-line-container">
          {
            new Array(line).fill(undefined).map((_, index) => {
              return (
                <li key={index} className="otaku-code-line">{index + 1}</li>
              )
            })
          }
        </ul>
      }
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
