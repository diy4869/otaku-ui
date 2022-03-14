import React, { useState, useRef } from 'react'
import { HighlightCode, HighlightCodeProps } from 'otaku-ui'
import * as copy from 'copy-to-clipboard'
import { Editor } from '../editor/editor'
import { Sandbox } from '../sandbox/sandbox'
import { Tooltip } from 'otaku-ui'
import classnames from 'classnames'
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

  const container = useRef(null)
  const [showEdit, setShowEdit] = useState(true)
  let [collapse, setCollapse] = useState(false)
  let [currentIndex, setCurrentIndex] = useState(0)
  
  const [data] = useState([
    {
      code,
      lang
    },
    style
  ])

  const edit = () => {
    
    // console.log(instance)
    // if (!instance) {
    //   const editorInstance = monaco.editor.create(container.current!, {
    //     value: code,
    //     language: 'javascript'
    //   });

    //   setShowEdit(true)
    //   setInstance(editorInstance)
    // }
  }

  return (
    <div className='otaku-code-example-container'>
      <div
        className='otaku-desc'
        dangerouslySetInnerHTML={{
          __html: desc
        }}
      ></div>

        <Sandbox></Sandbox>

      <div className='otaku-example'>{example}</div>
      <ul className='otaku-operation'>
        <li onClick={edit}>
          <Tooltip content='编辑'>
            <span>编辑</span>
          </Tooltip>
        </li>
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
      <Editor code={code} lang={lang}></Editor>
       <div ref={container} className={'otaku-edit-container'}></div>
      {/* {
        showEdit &&
      } */}
      
    </div>
  )
}
