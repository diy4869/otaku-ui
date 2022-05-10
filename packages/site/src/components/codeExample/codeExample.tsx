import React, { useState, useRef } from 'react'
import { HighlightCode, HighlightCodeProps, Icon, Tab, TabPane, message } from 'otaku-ui'
import * as copy from 'copy-to-clipboard'
import { Editor } from '../editor/editor'
import { Tooltip } from 'otaku-ui'
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary'
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
        <div className='otaku-example'>{example}</div>
        <Tab active={currentIndex} center onChange={(data) => {
          const { index } = data

          if (index === 1) {
            message.success('复制成功', 1000)
          }
        }}>
          <TabPane 
            id={0}
            name={
             <Tooltip content='编辑'>
              <Icon name='edit'></Icon>
            </Tooltip>
            }>
            <Editor code={code} lang={lang}></Editor>
          </TabPane>
          <TabPane 
            id={1}
            name={
            <Tooltip content='复制'>
              <Icon name='copy'></Icon>
            </Tooltip>
            }>
          </TabPane>
          <TabPane 
            id={2}
            name={
              <Tooltip content={collapse ? '折叠' : '展开'}>
                <Icon name='code'></Icon>
              </Tooltip>
            }>
            <HighlightCode
              lang={data[currentIndex].lang}
              code={data[currentIndex].code}
            ></HighlightCode>
          </TabPane>
        </Tab>
        {/* <ul className='otaku-operation'>
          <li onClick={edit}>
           
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
              <Icon name='copy'></Icon>
            </Tooltip>
          </li>
          <li
            onClick={() => {
              collapse = !collapse
              setCollapse(collapse)
            }}
          >
            <Tooltip content={collapse ? '折叠' : '展开'}>
              <Icon name='code'></Icon>
            </Tooltip>
          </li>
        </ul>
        {collapse && (
          <HighlightCode
            lang={data[currentIndex].lang}
            code={data[currentIndex].code}
          ></HighlightCode>
        )} */}

        

    </div>
   
  )
}

