import React, {useRef, useEffect} from 'react'
import * as monaco from 'monaco-editor'

// @ts-ignore


export const Editor: React.FC = () => {
  const divEl = useRef<HTMLDivElement>(null)
  let editor: monaco.editor.IStandaloneCodeEditor


  useEffect(() => {
    if (divEl.current) {
      editor = monaco.editor.create(divEl.current, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
          '\n'
        ),
        language: 'typescript',
      })
    }
    return () => {
      editor.dispose()
    }
  }, [])

  return <div className='Editor' ref={divEl}></div>
}
