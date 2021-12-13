import React, { useState } from 'react'
import { Button } from '../button/button'
import { Input } from '../input/input'
import './style.scss'

interface SearchProps {
  size: 'small' | 'middle' | 'large'
  children: React.ReactNode
}

export const Search = (props: SearchProps) => {
  const [val, setVal] = useState('')
  const {
    size = 'middle',
    children
  } = props

  return (
    <div className={`otaku-search-container otaku-search-size-${size}`}>
      <Input
        type="search"
        value={val}
        size={size}
        afterNode={
          <Button
            size={size}>
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
