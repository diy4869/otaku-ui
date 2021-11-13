import React, { useState } from 'react'
import { HighlightCode, HighlightCodeProps } from 'otaku-ui'
import * as copy from 'copy-to-clipboard'
import { Tooltip } from 'otaku-ui'
import './style.scss'

interface Example extends HighlightCodeProps {
  desc: string
  example?: React.ReactChildren
}

export function CodeExample (props: Example) {
  const {
    code,
    lang = 'typescript',
    desc,
    example
  } = props
  let [collapse, setCollapse] = useState(false)


  return (
    <div className="otaku-code-example-container">
      <div className="otaku-desc" dangerouslySetInnerHTML={{
        __html: desc
      }}>
      </div>
      <div className="otaku-example" >
          {/* { example } */}
      </div>
      <ul className="otaku-operation" >
        <li onClick={() => {
          copy(code, {
            debug: true
          })
          alert('复制成功')
        }}>
          <Tooltip content="复制">
            <span className='iconfont otaku-icon-copy'></span>
          </Tooltip>
        </li>
        <li
          onClick={() => {
            collapse = !collapse
            setCollapse(collapse)
          }}
        >
          <Tooltip content={collapse ? '折叠' : '展开'}>
            <span className={`iconfont otaku-icon-${collapse ? 'code' : 'code'}`}></span>
          </Tooltip>
        </li>

      </ul>
      {
        collapse && <HighlightCode
          lang={lang === 'undefined' ? 'tsx' : lang}
          code={code}
        ></HighlightCode>
      }
      
    </div>
  )
}
