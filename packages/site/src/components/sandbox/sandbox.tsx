import React, {useRef, useEffect, useState } from 'react'
import {Helmet} from 'react-helmet'
import ReactDOM from 'react-dom/client'
import { Button } from 'otaku-ui'
import './style.scss'

interface SandboxProps {
  code?: string
  children?: React.ReactNode
}

export function Sandbox(props: SandboxProps) {
  const {
    code
  } = props
  const container = useRef(null)
  const script = useRef(null)

  const [value, setValue] = useState(code)
  const [html, setHTML] = useState('')

  useEffect(() => {
    // setCode(`React.createElement(otaku_ui.Button, {
    //   type: 'primary'
    // }, 'script 渲染的内容')`)

    setValue(code)

  }, [container, code])



  const error = (e) => {
    console.log(e)
  }



  return (
    <div>
      <div ref={container} className='test-render'></div>
      <script
        dangerouslySetInnerHTML={{
          __html: new Function(
            'container',
            'require',
            'exports',
            `              
            if (!container) return
                        
            const React = require('react')
            const ReactDOM = require('react-dom/client') 
            
            ${value}
            `
          )(container.current,  (args) => {
            const path = {
              'react': require('react'),
              'react-dom/client': require('react-dom/client'),
              'otaku-ui': require('otaku-ui')
            }

            return path[args]
          }, {}),
        }}></script>
      {/* </Helmet> */}
      {/* <iframe 
        onError={error}
        className="sandbox-container" 
        width="500" 
        height="200"
        srcDoc={html}
        sandbox="allow-forms allow-pointer-lock allow-popups allow-modals allow-same-origin allow-scripts allow-top-navigation">
      </iframe> */}
    </div>
  )
}
