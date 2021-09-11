import React from 'react'
import { Button, HighlightCode, HighlightCodeProps } from 'otaku-ui'
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

  return (
    <div className="otaku-code-example-container">
      <div className="otaku-desc" dangerouslySetInnerHTML={{
        __html: desc
      }}>
      </div>
      <div className="otaku-example">
        {example}
      </div>
      <HighlightCode lang={lang} code={code}></HighlightCode>
    </div>
  )
}
