import React, { Children, useState } from 'react'
import './style.scss'
import { Input } from '../input/input'
import { Portal } from '../portal/portal'

interface SelectProps {
  children: React.ReactNode[]
}

export function Select (props: SelectProps) {
  const { children } = props
  const [show, setShow] = useState(false)

  const change = e => {
    console.log(e.target)
  }
  const focus = () => {
    setShow(true)
  }

  return (
    <div className='otaku-select-container'>
      <Input
        readonly
        placeholder='选择点什么吧'
        className='otaku-select-input'
        onFocus={focus}></Input>
      <Portal visible={show} clickOutSide={() => setShow(false)}>
        <ul className='otaku-select' onClick={change}>
          {children}
        </ul>
      </Portal>
    </div>
  )
}
export function SelectOptions (props: SelectProps) {
  const { children } = props

  return <li className='otaku-select-options'>{children}</li>
}
