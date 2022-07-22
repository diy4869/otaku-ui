import React, { useEffect, useState } from "react"
import classNames from "classnames"
import "./style.scss"

interface SwitchProps {
  value?: boolean
  activeText?: string
  inactiveText?: string
  activeColor?: string
  inactiveColor?: string
  activeTextColor?: string
  inactiveTextColor?: string
  disabled?: boolean
  size?: "small" | "middle" | "large"
  onChange?: (checked: boolean) => void
}

export function Switch(props: SwitchProps) {
  const {
    activeText,
    inactiveText,
    activeTextColor,
    inactiveTextColor,
    activeColor,
    inactiveColor,
    disabled,
    value = false,
    size = "middle",
    onChange
  } = props
  const [checked, setChecked] = useState(value)

  useEffect(() => {
    setChecked(value)
  }, [value])

  const click = () => {
    setChecked(!checked)
    onChange?.(checked)
  }

  return (
    <div className='otaku-switch-container'>
      <label
        htmlFor='otaku-switch'
        className='otaku-switch-active otaku-switch-label'
        style={{
          color: !checked ? inactiveTextColor : "black"
        }}>
        {/* {inactiveText} */}
      </label>
      <div
        className={classNames(
          "otaku-switch-inner",
          `otaku-switch-size-${size}`
        )}>
        <section
          className={classNames("otaku-switch", {
            "otaku-switch-checked": checked
          })}
          style={{
            backgroundColor: checked ? activeColor : inactiveColor
          }}
          onClick={click}>
          { checked ? <div className={classNames("otaku-switch-content checked-content")}>
            <span>{activeText}</span>
            <div
              className={classNames("otaku-switch-circle", {
                "otaku-switch-disabled": disabled
              })}
              onClick={click}></div>
          </div>
          : 
          <div className={classNames("otaku-switch-content unchecked-content")}>
            <div
              className={classNames("otaku-switch-circle", {
                "otaku-switch-disabled": disabled
              })}
              onClick={click}></div>
            <span>{inactiveText}</span>
          </div>
          }
        </section>
      </div>

      <label
        htmlFor='otaku-switch'
        className='otaku-switch-active otaku-switch-label'
        style={{
          color: checked ? activeTextColor : "black"
        }}>
        {/* {activeText} */}
      </label>
    </div>
  )
}
