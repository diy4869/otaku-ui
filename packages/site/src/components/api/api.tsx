import React, { useState } from 'react'
import {Tab, TabPane, HighlightCode, Table} from 'otaku-ui'
import './style.scss'

export function Api () {
  const code = `type ButtonType = 'default' | 'text' | 'primary' | 'success' | 'warning' | 'danger' | 'link'

export interface ButtonProps {
  disabled?: boolean
  loading?: boolean
  ghost?: boolean
  icon?: string
  bgcolor?: string
  color?: string
  className?: string
  href?: string
  target?: '_blank' | '_self'
  shape?: 'round' | 'circle'
  type?: ButtonType
  iconDirection?: 'left' | 'right' 
  size?: 'small' | 'middle' |'large'
  children?: React.ReactNode
  onClick?:() => void
}`

  const tableData = [
    {
      name: 'disabled',
      required: false,
      type: 'number',
      defaultValue: '',
      desc: '禁用',
    },
    {
      name: 'loading',
      required: false,
      type: 'number',
      defaultValue: '',
      desc: '禁用',
    },
    {
      name: 'size',
      required: false,
      type: 'small | middle | large',
      desc: '禁用',
    },
    {
        name: 'onClick',
        required: false,
        type: '() => void'
    }
  ]

  const tableColumn = [
    {
      label: '属性',
      prop: 'name',
    },
    {
      label: '是否必填',
      prop: 'required',
      render(data) {
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
      defaultValue: '这是没有数据的情况',
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
        <TabPane name='API' id={1}>
          <Table data={tableData} tableColumn={tableColumn}></Table>
        </TabPane>
      </Tab>
    </aside>
  )
}
