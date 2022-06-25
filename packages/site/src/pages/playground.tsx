import React, {useState, useEffect } from 'react'
import './playground.scss'
import { Editor } from '../components/editor/editor'

interface PlaygroundProps {
  code: string
  lang: string
}

export default function Playground (props: PlaygroundProps) {
  const [code, setCode] = useState('console.log(1)\n\n')
  const [lang, setLang] = useState('typescript')

  useEffect(() => {
    setCode(code)
    setLang(lang)
  }, [code, lang])

  return (
    <section className="site-playground">
      <header>
        OTAKU-UI Playground
      </header>
      <main>
        <section>
          <Editor code={code} lang={lang}></Editor>
        </section>
        <section>
          Example
        </section>
      </main>
    </section>
    
  )
}
