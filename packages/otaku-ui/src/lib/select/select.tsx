import React, { Children, useState } from 'react'
import './style.scss'
import { Input } from '../input/input'
import { Portal } from '../portal/portal'

interface SelectProps {
    children: React.ReactNode[]
}

export function Select(props: SelectProps) {
    const {
        children
    } = props

    return (
        <div className="otaku-select-container">
            <Input readonly placeholder="选择点什么吧" className="test"></Input>
            <Portal visible={false}>
                <ul className='otaku-select'>{ children }</ul>
            </Portal>
        </div>
    )
}
export function SelectOptions(props: SelectProps) {
    const { children } = props

  return (
      <li className="otaku-select-options">{ children}</li>
  )
}
