import React, { ChangeEvent, useState, useEffect } from 'react'
import classNames from 'classnames'
import './style.scss'

export interface CheckboxProps {
  checked?: boolean
  disabled?: boolean
  indeterminate?: boolean
  value?: string | number
  children?: React.ReactNode[]
  onChange?: (e?: React.BaseSyntheticEvent) => void
}

export function Checkbox (props: CheckboxProps) {
  const { disabled, checked = false, indeterminate, children, onChange } = props
  const [inputChecked, setInputChecked] = useState(checked)
  const [half, setHalf] = useState(indeterminate)

  useEffect(() => {
    setInputChecked(checked)
    setHalf(indeterminate)
  }, [checked, indeterminate])

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setInputChecked(e.target.checked)
    onChange?.(e)
  }

  return (
    <label className='otaku-checkbox-label'>
      <input
        type='checkbox'
        disabled={disabled}
        checked={inputChecked}
        className={
          classNames(
            'otaku-checkbox',
            'iconfont',
            [
              inputChecked ? 'is-checked' : half ? 'is-half' : '',
              inputChecked
              ? 'otaku-icon-checkbox-fill'
              : half
              ? 'otaku-icon-checkbox-indeterminate-fill'
              : ''
            ],
          )}
        onChange={change}
      />
      <span
        className={
          classNames('otaku-checkbox-label', [
            inputChecked ? 'is-checked' : half ? 'is-half' : ''
          ],
          {
            'otaku-checkbox-disabled': disabled
          })}>
        {children}
      </span>
    </label>
  )
}
