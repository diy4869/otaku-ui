import React, { useState } from 'react'
import {Tab, TabPane, HighlightCode, Table} from 'otaku-ui'
import './style.scss'

interface ApiProps {
  code: string
  html: string
}

export function Api (props: ApiProps) {
  const { code, html } = props

  console.log(props)
  // const string = data.replace('(\\)\g' , '')

  // const evalData: ApiData[] = json5.parse(data)

  // console.log(evalData)

  // const tableColumn = [
  //   {
  //     label: '属性',
  //     prop: 'name',
  //   },
  //   {
  //     label: '是否必填',
  //     prop: 'required',
  //     render(data: { row: any }) {
  //       const {row} = data

  //       return <span>{row.require ? '是' : '否'}</span>
  //     },
  //   },
  //   {
  //     label: '类型',
  //     prop: 'type',
  //   },
  //   {
  //     label: '默认值',
  //     prop: 'defaultValue',
  //     defaultValue: '',
  //   },
  //   {
  //     label: '描述',
  //     prop: 'desc',
  //   },
  // ]


  return (
    <aside className='otaku-api-container'>
      <Tab active={1}>
        <TabPane name='类型定义' id={0}>
          <HighlightCode lang={'ts'} code={code}></HighlightCode>
        </TabPane>
        <TabPane name='API' id={1}>
          <section dangerouslySetInnerHTML={{
            __html: html
          }} className="otaku-table-api"></section>
        </TabPane>
      </Tab>
    </aside>
  )
}
