import React, { ChangeEvent, useState, useEffect, useMemo } from 'react'
import './style.scss'

interface CheckBoxProps {
  value?: boolean
  disabled?: boolean
  indeterminate?: boolean
  children: React.ReactNode[]
}


export function CheckBoxGroup(props: CheckBoxProps) {
  const {
    disabled,
    value,
    indeterminate,
    children
  } = props

  console.log(children)
  return (
    <div>
      {/* {
        children?.map(item => {
          return React.createElement(item.type)
        })
      } */}
    </div>
  )
}

export function CheckBox (props: CheckBoxProps) {
  const {
    disabled,
    value,
    indeterminate,
    children
  } = props
  const [checked, setChecked] = useState(value)
  const [half, setHalf] = useState(indeterminate)

  useEffect(() => {
    setChecked(value)
    setHalf(indeterminate)
  }, [value, indeterminate])

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  }

  const test = useMemo(() => {

    return 3
  }, [checked, indeterminate])

  console.log(test)

  return (
    <label className="otaku-checkbox-label">
      <input
        type="checkbox"
        name=""
        id=""
        disabled={disabled}
        checked={checked}
        className={`
          otaku-checkbox
          iconfont
          ${checked ? 'is-checked' : half ? 'is-half' : ''}
          ${checked ? 'otaku-icon-checkbox-fill' : half ?  'otaku-icon-checkbox-indeterminate-fill' : ''}
        `}
        onChange={change} />
      <span className={`otaku-checkbox-label ${checked ? 'is-checked' : half ? 'is-half' : ''}`}>{children}</span>
    </label>
  )
}
