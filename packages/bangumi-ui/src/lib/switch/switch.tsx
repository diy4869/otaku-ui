import React, { useEffect, useState } from 'react'
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
  size?: 'mini' | 'small' | 'middle' | 'large'
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

  const change = (e) => {
    const { checked } = e.target
    setChecked(checked)
    onChange?.(checked)
  }

  return (
    <div className="b-switch-container">
      <label
        htmlFor="b-switch"
        className="b-switch-active b-switch-label"
        style={{
          color: !checked ? inactiveTextColor : 'black'
        }}>
        {inactiveText}
      </label>
      <div className="b-switch-inner">
        <label htmlFor="b-switch">
          <div
            className={`
              b-switch-circle 
              ${checked ? 'b-switch-checked' : ''} 
              ${disabled ? 'b-switch-disabled' : ''}`}>
          </div>
        </label>
        <input
          type="checkbox"
          name="b-switch"
          id="b-switch"
          onChange={change}
          className="b-switch"
          style={{
            backgroundColor: checked ? activeColor : inactiveColor
          }}
          disabled={disabled}>
        </input>
      </div>

      <label
        htmlFor="b-switch"
        className="b-switch-active b-switch-label"
        style={{
          color: checked ? activeTextColor : 'black'
        }}>
        {activeText}
      </label>
    </div>
  )
}
