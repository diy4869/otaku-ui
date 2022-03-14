import React from 'react'
import './style.scss'

interface SandboxProps {
  code?: string
  children?: React.ReactNode
}

export function Sandbox (props: SandboxProps) {
  const {
    code = `
      ReactDOM.render(
        React.createElement('div', null, 'iframe 渲染的内容'),
        container
      )
    `
  } = props

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    
        <style></style>
      </head>
      <body>
        <div id="app"></div>
      </body>
      <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
      <script>
        const container = document.getElementById('app')
        
        ${code}
      </script>
    </html>
  `

  return (
    <iframe 
      className="sandbox-container" 
      width="500" 
      height="200"
      srcDoc={html}
      sandbox="allow-forms allow-pointer-lock allow-popups allow-modals allow-same-origin allow-scripts allow-top-navigation">
    </iframe>
  )
}