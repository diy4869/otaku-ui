import React, { useState, useEffect } from "react"
import { Space } from '../space/space'
import { CheckboxProps } from './checkbox'

interface CheckboxGroupProps {
  disabled?: boolean
  value: number[] | string[]
  children?: React.ReactNode[]
  onChange: (data: number[] | string[]) => void
}

export function CheckboxGroup (props: CheckboxGroupProps) {
  const {
    value = [],
    disabled,
    children,
    onChange
  } = props

  const [data, setData] = useState(value)

  useEffect(() => {
    setData(value)
  }, [value])

  return (
    <div>
      <Space gap={[10, 20]}>
        {
          React.Children.map(children, node => {
            const el = node as React.ReactElement
            const includes = data?.includes(el.props.value as never)

            return React.cloneElement<CheckboxProps>(el, {
              ...el.props,
              disabled,
              checked: includes,
              onChange (e) {
                if (e?.target.checked) {
                  if (!includes) {
                    data.push(el.props.value as never)
                    setData(data)
                  }
                } else {
                  const findIndex = data.findIndex(item => item === el.props.value)
                  if (findIndex !== -1) {
                    data.splice(findIndex, 1)
                    setData(data)
                  }
                }
                onChange(data)
              }
            })
          })
        }
      </Space>
    </div>
  )
}