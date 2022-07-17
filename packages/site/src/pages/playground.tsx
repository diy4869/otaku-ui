import  React, { useState, useEffect } from 'react'
import { Sandbox } from '../components/sandbox/sandbox'
import twoslash from '@typescript/twoslash'
import * as ts  from 'typescript'
import './playground.scss'

// import { Editor } from '../components/editor/editor'

interface PlaygroundProps {
  code: string
  lang: string
}

const initialCode = `

function App () {
  return (
    <div>hello world</div>
  )
}

ReactDOM.createRoot(container).render(<App/>)
`
export default function Playground (props: PlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [lang, setLang] = useState('typescript')
  const [loading, setLoading] = useState('loading')
  const [runtimeCode, setRuntimeCode] = useState('')
  const compilerOptions = {
    noEmit: false,
    noEmitOnError: true,
    module: ts.ModuleKind.ESNext, 
    target: ts.ScriptTarget.ES5,
    jsx: ts.JsxEmit.React,
    declration: true,
    strict: true,
    noImplicitAny: true,
    lib: ['ESNEXT', 'DOM', 'DOM.Iterable'],
    jsxFactory: 'React.createElement',
    moduleResolution: ts.ModuleResolutionKind.NodeJs
  }

  useEffect(() => {
    setCode(code)
    setLang(lang)
    setRuntimeCode(ts.transpile(code, compilerOptions))
  }, [code, lang])

  useEffect(() => {
    const re: any = window.require

    re.config({
      paths: {
        vs: 'https://typescript.azureedge.net/cdn/4.0.5/monaco/min/vs',
        // vs: 'https://unpkg.com/@typescript-deploys/monaco-editor@4.0.5/min/vs',
        sandbox: 'https://www.typescriptlang.org/js/sandbox',
      },
      // This is something you need for monaco to work
      ignoreDuplicateModules: ['vs/editor/editor.main'],
    })

    re(['vs/editor/editor.main', 'vs/language/typescript/tsWorker', 'sandbox/index'], (
      main,
      ts,
      sandbox
    ) => {

      const isOK = main && ts && sandbox

      if (!isOK) {
        console.error('Could not get all the dependencies of sandbox set up!')
        console.error('main', !!main, 'ts', ts, 'sandbox', !!sandbox)
      } else {
        setLoading('')
        // twoslash(initialCode, 'tsx')
      }

      // Create a sandbox and embed it into the the div #monaco-editor-embed
      const sandboxConfig = {
        text: initialCode,
        compilerOptions: {
          ...compilerOptions,
          noEmitOnError: false
          
        },
        domID: 'playground',
      }

      const sandboxEditor = sandbox.createTypeScriptSandbox(sandboxConfig, main, ts)
      sandboxEditor.editor.focus()

      new ResizeObserver(() => {
        sandboxEditor.editor?.layout()
      }).observe(document.body)
    })
  }, [])

  return (
    <section className="site-playground">
      <header>
        OTAKU-UI Playground
      </header>
      <section className='editor-container'>
        { loading ? <div>{loading}</div> : null }
        <section id="playground"></section>
        {/* <Editor code={code} lang={lang}></Editor> */}
      </section>
      <section className='preview-container'>
        <Sandbox code={runtimeCode}></Sandbox>
      </section>

    </section>
    
  )
}
