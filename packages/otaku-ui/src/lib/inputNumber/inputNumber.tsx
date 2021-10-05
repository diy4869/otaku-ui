import React, { useState } from 'react'
import NP from 'number-precision'
import './style.scss'


interface InputNumberProps {
  value?: number
  min?: number
  max?: number
  step?: number
  size?: 'small' | 'middle' | 'large'
  disabled?: boolean
  readonly?: boolean
  onChange?: (val?: number) => void
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onInput?: React.FormEventHandler<HTMLInputElement> 
}


export function InputNumber(props: InputNumberProps) {
  const {
    value = 1,
    step = 1,
    min = -Infinity,
    max = Infinity,
    size,
    readonly,
    disabled,
    onChange,
    onBlur,
    onFocus,
    onInput
  } = props

  let [inputVal, setInputVal] = useState(value)
  // @ts-ignore
  const change = (e) => {
    setInputVal(e.target.value)
  }

  const calc = (type: 'up' | 'down') => {
    if (type === 'up') {
      if (inputVal >= max || disabled || readonly) return
      const result = NP.plus(inputVal, step)
      setInputVal(result)
    } else {
      if (inputVal <= min || disabled || readonly) return
      const result = NP.minus(inputVal, step)
      setInputVal(result)
    }
    onChange?.(inputVal)
  }

  
  return (
    <div className={`
      otaku-input-number-box
      otaku-input-number-size-${size}
      ${disabled ? 'otaku-input-number-disabled' : ''
    }`}>
      <div className={`otaku-input-number-container`}>
        <input
          type="number"
          value={inputVal}
          step={step}
          min={min}
          max={max}
          className="otaku-input-number"
          disabled={disabled}
          readOnly={readonly}
          onChange={change}
          onBlur={onBlur}
          onFocus={onFocus}
          onInput={onInput}/>
      </div>

      <ul className="otaku-input-number-direction">
        <li onClick={() => calc('up')}>
          <span className={`iconfont otaku-icon-up ${inputVal >= max || disabled ? 'input-number-icon-disabled' : ''}`}></span>
        </li>
        <li onClick={() => calc('down')}>
          <span className={`iconfont otaku-icon-down ${inputVal <= min || disabled ? 'input-number-icon-disabled' : ''}`}></span>
        </li>
      </ul>
    </div>
  )
}
