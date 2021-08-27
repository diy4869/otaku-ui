import React, { useState } from 'react'
import './App.scss'
import { hot } from 'react-hot-loader/root'
import MarkdownIt from 'markdown-it'
import test from './test.md'
import { CodeExample } from './components/codeExample/codeExample'

const list = [
  {
    name: '开发指南',
    children: [
      {
        name: '介绍'
      }
    ]
  },
  {
    name: '基础组件',
    children: [
      {
        name: 'Button 按钮'
      }
    ]
  },
  {
    name: '表单组件',
    children: [
      {
        name: 'Input 输入框'
      },
      {
        name: 'Form 表单'
      }
    ]
  }
]

function App() {
  return (
    <div className="b-home">
      <header className="b-header">
        {/* BANGUMI-UI | OTAKU-UI |  */}
        <div className="b-title">Lo-ui</div>
        <div></div>
      </header>
      <aside>{
        list.map(item => {
          return (
            <div>
              <h3 className="title">{item.name}</h3>
              <ul>
                {
                  item.children.map(children => {
                    return (
                      <li>{ children.name }</li>
                    )
                  })
                }
              </ul>
            </div>
          )
        })
      }</aside>
      <main>
        <CodeExample></CodeExample>
      </main>
    </div>
  )
}

export default hot(App)

