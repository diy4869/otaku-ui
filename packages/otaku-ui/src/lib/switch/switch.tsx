import React, { ChangeEvent, useEffect, useState } from 'react'
import classNames from 'classnames'
import './style.scss'

interface SwitchProps {
  value?: boolean
  activeText?: string
  inactiveText?: string
  activeColor?: string
  inactiveColor?: string
  activeTextColor?: string
  inactiveTextColor?: string
  disabled?: boolean
  size?: 'small' | 'middle' | 'large'
  onChange?: (checked?: boolean) => void
}

export function Switch (props: SwitchProps) {
  const {
    value = false,
    activeText,
    inactiveText,
    activeTextColor,
    inactiveTextColor,
    activeColor,
    inactiveColor,
    disabled,
    onChange
  } = props
  const [
    checked,
    setChecked
  ] = useState(value)

  useEffect(
    () => {
      setChecked(value)
    },
    [value]
  )

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setChecked(checked)
    onChange?.(checked)
  }

  return (
    <div className="otaku-switch-container">
      <label
        htmlFor="otaku-switch"
        className="otaku-switch-active otaku-switch-label"
        style={{
          color: !checked ? inactiveTextColor : 'black'
        }}>
        {inactiveText}
      </label>
      <div className="otaku-switch-inner">
        <label htmlFor="otaku-switch">
          <div
            className={
              classNames('otaku-switch-circle', {
              'otaku-switch-checked': checked,
              'otaku-switch-disabled': disabled
            })}>
          </div>
        </label>
        <input
          type="checkbox"
          name="otaku-switch"
          id="otaku-switch"
          onChange={change}
          className="otaku-switch"
          style={{
            backgroundColor: checked ? activeColor : inactiveColor
          }}
          disabled={disabled}>
        </input>
      </div>

      <label
        htmlFor="otaku-switch"
        className="otaku-switch-active otaku-switch-label"
        style={{
          color: checked ? activeTextColor : 'black'
        }}>
        {activeText}
      </label>
    </div>
  )
}
