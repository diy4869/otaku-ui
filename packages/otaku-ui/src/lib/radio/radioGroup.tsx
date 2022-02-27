import React, { useState, useEffect } from "react"
import { Space } from '../space/space'

interface RadioGroupProps {
  value: number | string
  name?: string
  children: React.ReactNode[]
  onChange?: (e?: React.BaseSyntheticEvent) => void
}

interface RadioGroupContextOptions {
  name: string
}

export const RadioGruopContext = React.createContext<RadioGroupContextOptions | null>(null)

export function RadioGroup (props: RadioGroupProps) {
  const {
    value,
    name = 'value',
    children,
    onChange
  } = props


  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <RadioGruopContext.Provider value={{
      name: name
    }}>
      <Space>
        {
          React.Children.map(children, (node) => {
            if (!node) return
            return React.cloneElement(node as React.ReactElement, {
              name: 'radio',
              checked: value === (node as React.ReactElement).props.value,
              onChange
            })
          })
        }
        {/* { children} */}
      </Space>
    </RadioGruopContext.Provider>
  )
}
