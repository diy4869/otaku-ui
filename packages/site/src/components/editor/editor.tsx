


import * as ts  from 'typescript'
import { ErrorBoundary } from 'react-error-boundary'
import React, {useRef, useState, useEffect } from 'react'
import { createSystem, createDefaultMapFromCDN, createVirtualCompilerHost } from '@typescript/vfs'
import lzstring from 'lz-string'
import { Sandbox } from '../sandbox/sandbox'
import { setLocaleData } from 'monaco-editor-nls'
import zh_CN from 'monaco-editor-nls/locale/zh-hans.json'
import throttle from 'lodash/throttle'

setLocaleData(zh_CN)

import './style.scss'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker'
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker'

// const monaco = require('monaco-editor');





// self.MonacoEnvironment = {
// 	getWorkerUrl: function (moduleId, label) {
//     console.log(label, moduleId)
// 		if (label === 'typescript' || label === 'javascript') {
// 			return tsWorker
// 		}

// 		return editorWorker
// 	}
// };

interface EditorProps {
  code: string
  lang: string
}

export const Editor = (props: EditorProps) => {
  const {
    code,
    lang
  } = props
  const divEl = useRef<HTMLDivElement>(null)
  const [transformCode, setTransformCode] = useState('')
  const compilerOptions = {
    noEmit: false,
    noEmitOnError: true,
    module: ts.ModuleKind.CommonJS, 
    target: ts.ScriptTarget.ES5,
    jsx: ts.JsxEmit.React,
    declration: true,
    strict: true,
    noImplicitAny: true,
    lib: ['esnext', 'dom'],
    moduleResolution: ts.ModuleResolutionKind.NodeJs
  }

  let editor: monaco.editor.IStandaloneCodeEditor

  const base =  {
    compilerOptions: compilerOptions,
    fileName: 'index.tsx',
    reportDiagnostics: true
  }

  const initEditor = () => {
    editor = monaco.editor.create(divEl.current, {
      value: code,
      language: 'typescript',
      theme: 'vs',
      wordWrap: 'on',
      minimap: {
        enabled: false
      },
    })
  
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: ts.JsxEmit.React
    })

    editor.onDidChangeModelContent(() => {
      console.log(editor.getValue())
      throttle(() => {
        const data = ts.transpileModule(editor.getValue(), base)

        setTransformCode(data.outputText)
      }, 100)()
      
    })
  }

  useEffect(() => {
    const data = ts.transpileModule(code, base)

    console.log(data)
    // setTransformCode(data.outputText)
  

    new ResizeObserver(() => {
      editor?.layout()
    }).observe(document.body)

    const getTypescriptCDN = async () => {
      if (divEl.current) {
        initEditor()

        
        // const fsMap = await createDefaultMapFromCDN(compilerOptions, ts.version, false, ts, lzstring)
  
        // fsMap.set('index.tsx', code)
  
        // const system = createSystem(fsMap)
        // const host = createVirtualCompilerHost(system, compilerOptions, ts)
  
        // const program = ts.createProgram({
        //   rootNames: [...fsMap.keys()],
        //   options: compilerOptions,
        //   host: host.compilerHost
        // })
        
        // env.languageService.getDocumentHighlights('index.tsx', 0, ['index.tsx'])
  
  
     
      }
    }

    getTypescriptCDN()
    
    return () => {
      editor?.dispose()
    }
  }, [])


  return  (
    <>
      <ErrorBoundary 
        onReset={(...args) => {
            console.log(123, args)
            return <div></div>
        }}
        fallback={<div>异常</div>} 
        resetKeys={[transformCode]}>
        <Sandbox code={transformCode}></Sandbox>
      </ErrorBoundary>
      <div className='Editor' ref={divEl}></div>
    </>
  ) 
}
