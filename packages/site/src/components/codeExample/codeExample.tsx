import React, { useState } from 'react'
import { HighlightCode, HighlightCodeProps } from 'otaku-ui'
import * as copy from 'copy-to-clipboard'
import { Tooltip } from 'otaku-ui'
import './style.scss'

interface Example extends HighlightCodeProps {
  desc: string
  style: {
    lang: string
    code: string
  }
  example: React.ReactChildren
}

export function CodeExample (props: Example) {
  const { code, style, desc, example, lang = 'typescript' } = props
  let [collapse, setCollapse] = useState(false)
  let [currentIndex, setCurrentIndex] = useState(0)
  const [data] = useState([
    {
      code,
      lang
    },
    style
  ])

  return (
    <div className='otaku-code-example-container'>
      <div
        className='otaku-desc'
        dangerouslySetInnerHTML={{
          __html: desc
        }}
      ></div>
      <div className='otaku-example'>{example}</div>
      <ul className='otaku-operation'>
        <li
          onClick={() => {
            copy(data[currentIndex].code, {
              debug: true
            })
            alert('复制成功')
          }}
        >
          <Tooltip content='复制'>
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
            <span
              className={`iconfont otaku-icon-${collapse ? 'code' : 'code'}`}
            ></span>
          </Tooltip>
        </li>
      </ul>
      {/* <ul>
        {data.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                setCurrentIndex(index)
              }}
            >
              lang: {item?.lang}
            </li>
          )
        })}
      </ul> */}
      {collapse && (
        <HighlightCode
          lang={data[currentIndex].lang}
          code={data[currentIndex].code}
        ></HighlightCode>
      )}
    </div>
  )
}
