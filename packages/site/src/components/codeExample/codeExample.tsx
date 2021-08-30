import React from 'react'
import { Button, HighlightCode, HighlightCodeProps } from 'bangumi-ui'
import './style.scss'

interface Example extends HighlightCodeProps {
  desc: string
  example: React.ReactChildren
}

export function CodeExample (props: Example) {
  const {
    code,
    lang,
    desc,
    example
  } = props

  console.log(desc)
  return (
    <div className="b-code-example-container">
      <div className="b-desc" dangerouslySetInnerHTML={{
        __html: desc
      }}>
      </div>
      <div className="b-example">
        
        {example}
      </div>
      <HighlightCode lang={lang} code={code}></HighlightCode>
    </div>
  )
}
