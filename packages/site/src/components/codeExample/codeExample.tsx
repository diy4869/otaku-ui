import React, { useLayoutEffect } from 'react'
import { Button } from 'bangumi-ui'
import './style.scss'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs.css'

hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))
export function CodeExample(props) {
  const {
    children = `
      <Button type="primary"></Button>
    `
  } = props

  useLayoutEffect(() => {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('pre code').forEach((el) => {
      hljs.highlightElement(el)
    });
  });
  })

  return (
    <div className="b-code-example-container">
      <div className="b-example">
        <Button type="primary">主要按钮</Button>
      </div>
      <div className="b-code">
        <pre>
          <code>
              {`${children}`}
          </code>
        </pre>
      </div>
    </div>
  )
}
