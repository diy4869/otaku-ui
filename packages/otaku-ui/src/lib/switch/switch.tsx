import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import './style.scss'

interface SwitchProps {
  value?: boolean
  disabled?: boolean
  checkedText?: string
  uncheckedText?: string
  checkedColor?: string
  uncheckedColor?: string
  checkedTextColor?: string
  uncheckedTextColor?: string
  size?: 'small' | 'middle' | 'large'
  checkedIcon: React.ReactNode
  uncheckedIcon: React.ReactNode
  onChange?: (checked: boolean) => void
}

export function Switch (props: SwitchProps) {
  const {
    checkedText,
    uncheckedText,
    checkedTextColor,
    uncheckedTextColor,
    checkedColor,
    uncheckedColor,
    checkedIcon,
    uncheckedIcon,
    disabled,
    value = false,
    size = 'middle',
    onChange
  } = props
  const [checked, setChecked] = useState(value)

  useEffect(() => {
    setChecked(value)
  }, [value])

  const click = () => {
    if (disabled) return
    setChecked(!checked)
    onChange?.(checked)
  }

  return (
    <div className="otaku-switch-container">
      <label
        htmlFor="otaku-switch"
        className="otaku-switch-checked otaku-switch-label"
        style={{
          color: !checked ? uncheckedTextColor : 'black'
        }}>
      </label>
      <div
        className={classNames(
          'otaku-switch-inner',
          `otaku-switch-size-${size}`
        )}>
        <section
          className={classNames('otaku-switch', {
            'otaku-switch-checked': checked,
            'otaku-switch-disabled': disabled
          })}
          style={{
            backgroundColor: checked ? checkedColor : uncheckedColor
          }}
          onClick={click}>
          { checked ? <div className={classNames('otaku-switch-content checked-content')}>
              <span>{checkedText}</span>
              <div
                className={classNames('otaku-switch-circle', {
                  'otaku-switch-disabled': disabled
                })}
                onClick={click}>{checkedIcon}</div>
            </div>
           : <div
              className={classNames('otaku-switch-content unchecked-content')}>
              <div
                className={classNames('otaku-switch-circle', {
                  'otaku-switch-disabled': disabled
                })}
                onClick={click}>{uncheckedIcon}</div>
              <span>{uncheckedText}</span>
            </div>}
        </section>
      </div>
      <label
        htmlFor="otaku-switch"
        className="otaku-switch-checked otaku-switch-label"
        style={{
          color: checked ? checkedTextColor : 'black'
        }}>
      </label>
    </div>
  )
}
