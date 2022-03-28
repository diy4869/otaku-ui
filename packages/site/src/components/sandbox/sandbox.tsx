import React, {useRef, useEffect, useState } from 'react'

import {Helmet} from 'react-helmet'
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

  const Require = (args) => {
    const path = {
      'react': require('react'),
      'react-dom/client': require('react-dom/client'),
      'otaku-ui': require('otaku-ui')
    }

    return path[args]
  }

  useEffect(() => {
    // setCode(`React.createElement(otaku_ui.Button, {
    //   type: 'primary'
    // }, 'script 渲染的内容')`)

    
    // setHTML(
    //   `
    //   <!DOCTYPE html>
    //   <html lang="en">
    //     <head>
    //       <meta charset="UTF-8" />
    //       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    //       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //       <title>Document</title>

    //       <style></style>
    //     </head>
    //     <body>
    //       <div id="app"></div>
    //     </body>
    //     <script>
    //         const container = document.getElementById('app')

            
    //         function render (require, exports = {}) {
    //           if (!container) return
                          
    //           const React = require('react')
    //           const ReactDOM = require('react-dom/client') 
              
    //           ${code}
    //         }

    //         render(
    //           ${Require}
    //         )

    //     </script>
    //   </html>
    //   `
    // )

    setValue(code)

  }, [container, code])



  const error = (e) => {
    console.log(e)
  }

  document.body.addEventListener('error', (e) => {
    console.log(e)
  })
 

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
              // debugger;
              const React = require('react')
              const ReactDOM = require('react-dom/client') 
              
              ${value}
              `
            )(container.current, Require, {}),
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
