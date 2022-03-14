import React, {useRef, useState, useEffect} from 'react'
import * as ts  from 'typescript'
import { createSystem, createDefaultMapFromCDN, createVirtualCompilerHost } from '@typescript/vfs'
import lzstring from 'lz-string'
import { Sandbox } from '../sandbox/sandbox'
import * as monaco from 'monaco-editor'

import './style.scss'

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

  let editor: monaco.editor.IStandaloneCodeEditor

  // ts-ignore
  useEffect(async () => {
    if (divEl.current) {
      const compilerOptions = {
        // esnext
        module: 99, 
        // es5
        target: 1,
        // react
        jsx: 2,
        // node
        moduleResolution: 2
      }

      const fsMap = await createDefaultMapFromCDN(compilerOptions, ts.version, false, ts, lzstring)

      fsMap.set('index.tsx', code)

      const system = createSystem(fsMap)
      const host = createVirtualCompilerHost(system, compilerOptions, ts)

      const program = ts.createProgram({
        rootNames: [...fsMap.keys()],
        options: compilerOptions,
        host: host.compilerHost
      })

      console.log(ts)
      console.log(program.getTypeChecker(), [...fsMap.keys()])

      // console.log(program.emitFile())
      const demoCode = `
        function Demo() {
          const a: number = 1

          return (
            <div>hello world {a}</div>
          )
        }

        ReactDOM.render(<Demo/>, container)
      `
      setTransformCode(
        ts.transpile(code, compilerOptions)
      )
      console.log(ts.transpile(code, compilerOptions))
      // env.languageService.getDocumentHighlights('index.tsx', 0, ['index.tsx'])


      editor = monaco.editor.create(divEl.current, {
        value: code,
        language: 'typescript',
        theme: 'vs'
      })

      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: 2
      })

      editor.onDidChangeModelContent(e => {
        setTransformCode(
          ts.transpile(editor.getValue(), compilerOptions)
        )
        console.log(e, editor.getValue())
      })
    }
    return () => {
      editor.dispose()
    }
  }, [])

  return  (
    <>
      <Sandbox code={transformCode}></Sandbox>
      <div className='Editor' ref={divEl}></div>
    </>
  ) 
}
