import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Button, ButtonProps } from '../button/button'
import { Input, InputProps } from '../input/input'
import './style.scss'

export interface SearchProps extends Omit<InputProps, 'onEnter'> {
  size: 'small' | 'middle' | 'large'
  ButtonProps: Omit<ButtonProps, 'onClick'>
  children: React.ReactNode
  onClick?: (val: string) => void
  onEnter?: (val: string) => void
}


export const Search = (props: SearchProps) => {
  const {
    value,
    size = 'middle',
    children,
    onClick,
    onEnter
  } = props
  const [val, setVal] = useState(value)

  useEffect(() => {
    setVal(value)
    // console.log(val, value)
    
  }, [value])

  return (
    <div className={classNames('otaku-search-container', `otaku-search-size-${size}`)}>
      <Input
        {...props}
        type="search"
        value={val}
        afterNode={
          <Button
            {...props.ButtonProps}
            size={size}
            onClick={() => {
              onClick?.(val || '')
            }}>
            {children}
          </Button>
        }
        onChange={(val) => {
          setVal(val)
        }}
        onEnter={(e) => onEnter?.(e.target.value)}
      ></Input>
      {/* <Telport className="otaku-search-popup">
        <ul className="otaku-search-list">
          {
            Array(10).fill(undefined).map((_, index) => {
              return (
              <li className="otaku-search-item">{index}</li>
              )
            })
          }
        </ul>
      </Telport> */}
    </div>
  )
}
