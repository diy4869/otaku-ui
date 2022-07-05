import React, {useState, useEffect } from 'react'
import twoslash from '@typescript/twoslash'
import './playground.scss'

// import { Editor } from '../components/editor/editor'

interface PlaygroundProps {
  code: string
  lang: string
}

export default function Playground (props: PlaygroundProps) {
  const [code, setCode] = useState('console.log(1)\n\n')
  const [lang, setLang] = useState('typescript')
  const [loading, setLoading] = useState('loading')

  useEffect(() => {
    setCode(code)
    setLang(lang)
  }, [code, lang])

  useEffect(() => {
    window.require.config({
      paths: {
        vs: 'https://typescript.azureedge.net/cdn/4.0.5/monaco/min/vs',
        // vs: 'https://unpkg.com/@typescript-deploys/monaco-editor@4.0.5/min/vs',
        sandbox: 'https://www.typescriptlang.org/js/sandbox',
      },
      // This is something you need for monaco to work
      ignoreDuplicateModules: ['vs/editor/editor.main'],
    })

    window.require(['vs/editor/editor.main', 'vs/language/typescript/tsWorker', 'sandbox/index'], (
      main,
      _tsWorker,
      sandboxFactory
    ) => {
      const initialCode = `
interface ButtonProps {
  type: 'primary' | 'success'
}

const button: ButtonProps = {
  type: 'danger'
}
`
      const isOK = main && window.ts && sandboxFactory

      if (!isOK) {
        console.error('Could not get all the dependencies of sandbox set up!')
        console.error('main', !!main, 'ts', !!window.ts, 'sandbox', !!sandbox)
      } else {
        setLoading('')
        // twoslash(initialCode, 'tsx')
      }

      // Create a sandbox and embed it into the the div #monaco-editor-embed
      const sandboxConfig = {
        text: initialCode,
        compilerOptions: {
          noEmitOnError: false
        },
        domID: 'playground',
      }

      const sandbox = sandboxFactory.createTypeScriptSandbox(sandboxConfig, main, window.ts)
      sandbox.editor.focus()
    })
  }, [])

  return (
    <section className="site-playground">
      <header>
        OTAKU-UI Playground
      </header>
      <main>
        
        <section>
          <div>{loading}</div>
          <section id="playground"></section>
          {/* <Editor code={code} lang={lang}></Editor> */}
        </section>
        <section>
          Example
        </section>
      </main>
    </section>
    
  )
}
