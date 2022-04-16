import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Button, ButtonProps } from '../button/button'
import { Input, InputProps } from '../input/input'
import './style.scss'

interface SearchProps extends InputProps {
  size: 'small' | 'middle' | 'large'
  ButtonProps: ButtonProps
  children: React.ReactNode
}

export const Search = (props: SearchProps) => {
  const {
    value,
    size = 'middle',
    children
  } = props
  const [val, setVal] = useState(value)

  useEffect(() => {
    if (value) {
      setVal(value)
    }
    
  }, [value])

  return (
    <div className={classNames('otaku-search-container', `otaku-search-size-${size}`)}>
      <Input
        type="search"
        value={val}
        {...props}
        afterNode={
          <Button
            size={size}
            {...props.ButtonProps}>
            {children}
          </Button>
        }
        onChange={(val) => {
          setVal(val)
        }}
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
