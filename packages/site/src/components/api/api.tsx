import React, { useState } from 'react'
import {Tab, TabPane, HighlightCode, Table} from 'otaku-ui'
import './style.scss'
import json5 from 'json5'

interface ApiProps {
  code: string
  data: string
}

interface ApiData {
  name: string
  data: string
}

export function Api (props: ApiProps) {

  const { code, data } = props

  console.log(props)
  const string = data.replace('(\\)\g' , '')
  console.log(string)
  // const evalData: ApiData[] = json5.parse(string)

  const tableColumn = [
    {
      label: '属性',
      prop: 'name',
    },
    {
      label: '是否必填',
      prop: 'required',
      render(data: { row: any }) {
        const {row} = data

        return <span>{row.require ? '是' : '否'}</span>
      },
    },
    {
      label: '类型',
      prop: 'type',
    },
    {
      label: '默认值',
      prop: 'defaultValue',
      defaultValue: '',
    },
    {
      label: '描述',
      prop: 'desc',
    },
  ]

  return (
    <aside className='otaku-api-container'>
      <Tab active={0}>
        <TabPane name='类型定义' id={0}>
          <HighlightCode lang={'ts'} code={code}></HighlightCode>
        </TabPane>
        {/* <TabPane name='API' id={1}>
          {
            evalData?.map(item => {
              const tableData = eval(item.data)

              return (
                <section>
                  <h2>{item.name}</h2>
                  <Table data={tableData} tableColumn={tableColumn}></Table>
                </section>
              )
            })
          }
        </TabPane> */}
      </Tab>
    </aside>
  )
}
