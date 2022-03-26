


import * as ts  from 'typescript'

import React, {useRef, useState, useEffect } from 'react'
import { createSystem, createDefaultMapFromCDN, createVirtualCompilerHost } from '@typescript/vfs'
import lzstring from 'lz-string'
import { Sandbox } from '../sandbox/sandbox'
import { setLocaleData } from 'monaco-editor-nls'
import zh_CN from 'monaco-editor-nls/locale/zh-hans.json'

setLocaleData(zh_CN)

import './style.scss'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
// const monaco = require('monaco-editor');

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
    moduleResolution: ts.ModuleResolutionKind.NodeJs
  }

  let editor: monaco.editor.IStandaloneCodeEditor

 

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
      setTransformCode(
        ts.transpile(editor.getValue(), compilerOptions)
      )
    })
  }

  useEffect(() => {
    setTransformCode(
      ts.transpile(code, compilerOptions)
    )
  
    console.log(transformCode)

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
      <Sandbox code={transformCode}></Sandbox>
      <div className='Editor' ref={divEl}></div>
    </>
  ) 
}
