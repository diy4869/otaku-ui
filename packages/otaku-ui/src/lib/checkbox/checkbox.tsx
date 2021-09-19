import React, { ChangeEvent, useState, useEffect, useMemo } from 'react'
import './style.scss'

interface CheckBoxProps {
  checked?: boolean
  disabled?: boolean
  indeterminate?: boolean
  value?: string | number
  children?: React.ReactNode[]
  onChange?: (checked?: boolean) => void
}


export function CheckboxGroup (props: CheckBoxProps) {
  const {
    disabled,
    // checked,
    indeterminate,
    children
  } = props

  return (
    <div>
      {children}
      {/* {
        children?.map(item => {
          return React.createElement(item.type)
        })
      } */}
    </div>
  )
}

export function Checkbox (props: CheckBoxProps) {
  const {
    disabled,
    checked = false,
    indeterminate,
    children,
    onChange
  } = props
  
  const [inputChecked, setInputChecked] = useState(checked)
  const [half, setHalf] = useState(indeterminate)

  useEffect(() => {
    setInputChecked(checked)
    setHalf(indeterminate)
  }, [checked, indeterminate])

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setInputChecked(e.target.checked)
    onChange?.(e.target.checked)
  }

  return (
    <label className="otaku-checkbox-label">
      <input
        type="checkbox"
        disabled={disabled}
        checked={inputChecked}
        className={`
          otaku-checkbox
          iconfont
          ${inputChecked ? 'is-checked' : half ? 'is-half' : ''}
          ${inputChecked ? 'otaku-icon-checkbox-fill' : half ?  'otaku-icon-checkbox-indeterminate-fill' : ''}
        `}
        onChange={change} />
      <span className={`otaku-checkbox-label ${inputChecked ? 'is-checked' : half ? 'is-half' : ''}`}>{children}</span>
    </label>
  )
}
