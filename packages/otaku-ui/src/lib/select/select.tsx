import React, { useState, useEffect } from 'react'
import './style.scss'
import { Input } from '../input/input'
import { Icon } from '../icon/icon'
import { Portal } from '../portal/portal'

interface Context {
  multiple?: boolean
  selected?: Array<string | number> | string | number | undefined
}

interface SelectProps {
  size?: 'small' | 'middle' | 'large'
  multiple?: boolean
  disabled?: boolean
  value?: number | string | Array<string | number>
  placeholder?: string
  children?: React.ReactNode[]
}

export const SelectContext = React.createContext<Context>({
  selected: undefined
})

export function Select (props: SelectProps) {
  const { value, disabled, size, multiple, placeholder, children } = props
  const [show, setShow] = useState(false)
  const [active, setActive] = useState(value || undefined)
  const [selected, setSelected] = useState(value as Array<string | number> || [])
  // const [value, setValue] = useState()


  useEffect(() => {
    value && multiple ? setSelected(value as Array<string | number>) : setActive(value)
  }, [multiple, value])

  const click = (e: React.BaseSyntheticEvent) => {
    console.log(e, e.target, e.target.value)
    if (multiple) {
      if (!selected.includes(e.target.value)) {
        setSelected([...selected, e.target.value])
      } else {
        const findIndex = selected.findIndex(item => item === e.target.value)
        selected.splice(findIndex, 1)
        setSelected([...selected])
      }
    } else {
      setActive(e.target.value)
      console.log(selected)
    }
  }

  const focus = () => {
    setShow(true)
  }

  return (
    <div className='otaku-select-container'>
      <Input
        size={size}
        disabled={disabled}
        readonly
        placeholder={placeholder}
        className='otaku-select-input'
        afterIcon={<Icon name={`arrow-down ${show ? 'rotate' : ''}`}></Icon>}
        onFocus={focus}></Input>
      <Portal visible={show} clickOutSide={() => setShow(false)}>
        <SelectContext.Provider value={{
          multiple,
          selected: multiple ? selected : active ?? undefined
        }}>
          <ul className='otaku-select' onClick={click}>
            {children}
          </ul>
        </SelectContext.Provider>
      </Portal>
    </div>
  )
}

