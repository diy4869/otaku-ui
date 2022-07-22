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
  const iframe = useRef(null)

  const [value, setValue] = useState(code)
  const [html, setHTML] = useState('')


  

  useEffect(() => {
    console.log(code)
    // setCode(`React.createElement(otaku_ui.Button, {
    //   type: 'primary'
    // }, 'script 渲染的内容')`)

    
    setHTML(
      `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script
            src="https://unpkg.com/react@18/umd/react.development.js"
          ></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <style>
            html,
            body,
            div,
            span,
            applet,
            object,
            iframe,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            
            blockquote,
            pre,
            a,
            abbr,
            acronym,
            address,
            big,
            cite,
            code,
            del,
            dfn,
            em,
            img,
            ins,
            kbd,
            q,
            s,
            samp,
            small,
            strike,
            strong,
            sub,
            sup,
            tt,
            var,
            b,
            u,
            i,
            center,
            dl,
            dt,
            dd,
            ol,
            ul,
            li,
            fieldset,
            form,
            label,
            legend,
            table,
            caption,
            tbody,
            tfoot,
            thead,
            tr,
            th,
            td,
            article,
            aside,
            canvas,
            details,
            embed,
            figure,
            figcaption,
            footer,
            header,
            menu,
            nav,
            output,
            ruby,
            section,
            summary,
            time,
            mark,
            audio,
            video,
            input {
                margin: 0;
                padding: 0;
                vertical-align: baseline;
            }
            
            html,
            body {
                height: 100%;
                color: black;
            }
            
            input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
              background-color: rgb(250, 255, 189); /* #FAFFBD; */
              background-image: none;
              color: rgb(0, 0, 0);
            }
            
            input:-internal-autofill-selected  {
                background-color: transparent !important;
                color: -internal-light-dark-color(transparent, transparent) !important;
            }
            
            /* HTML5 display-role reset for older browsers */
            
            article,
            aside,
            details,
            figcaption,
            figure,
            footer,
            header,
            menu,
            nav,
            section {
                display: block;
            }
            
            
            blockquote,
            q {
                quotes: none;
            }
            
            blockquote::before,
            blockquote::after,
            q::before,
            q::after {
                content: none;
            }
            
            table {
                border-collapse: collapse;
                border-spacing: 0;
            }
            
            
            /* custom */
            
            a {
                text-decoration: none;
                backface-visibility: hidden;
                cursor: pointer;
            }
            
            li {
                list-style: none;
            }
            
            html,
            body {
                width: 100%;
            }
            
            body {
                -webkit-text-size-adjust: none;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }
            
            input[type="text"] {
                outline: none;
            }
          </style>
        </head>
        <body>
          <div id="app"></div>
        </body>
        <script>
            console.log(window)
            
            const container = document.getElementById('app')
            
              ${code}


        </script>
      </html>
      `
    )

    setValue(code)

  }, [container, code])



  const error = (e) => {
    console.log('error', e)
  }

  useEffect(() => {
    if (iframe.current) {
      iframe.current.addEventListener('error', (e) => {
        console.log(e)
      })
    }
  })
  
 

  return (
    <>
        <div ref={container} className='test-render'></div>
        {/* <script
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
          }}></script> */}
     
      {/* </Helmet> */}
      <iframe 
        ref={iframe}
        onError={error}
        className="sandbox-container" 
        srcDoc={html}
        sandbox="allow-forms allow-pointer-lock allow-popups allow-modals allow-same-origin allow-scripts allow-top-navigation">
      </iframe>
    </>
  )
}
