import React, { useState, useLayoutEffect } from 'react'
import { Button } from 'bangumi-ui'
import './style.scss'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs.css'

hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))

export function CodeExample (props) {
  const {
    lang = 'typescript',
    code,
    example
  } = props
  const [highlightCode, setHighLightCode] = useState('')


  useLayoutEffect(() => {
      const res = hljs.highlight(code, {
        language: lang,
        ignoreIllegals: false
      }).value

      setHighLightCode(res)
  })

  return (
    <div className="b-code-example-container">
      <div className="b-example">
        {example}
      </div>
      <div className="b-code">
        <pre>
          <code dangerouslySetInnerHTML={{
            __html: highlightCode
          }}>
          </code>
        </pre>
      </div>
    </div>
  )
}
