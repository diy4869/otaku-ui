import React, { useState, useEffect, useContext } from "react"
import classNames from "classnames"
import  { RadioGruopContext } from './radioGroup'
import "./style.scss"

interface RadioProps {
  value: number | string
  checked?: boolean
  disabled?: boolean
  children?: React.ReactNode
  onChange?: (e?: React.BaseSyntheticEvent) => void
}

export function Radio(props: RadioProps) {
  const { checked, disabled, children, onChange } = props
  const [val, setVal] = useState(checked)
  const context = useContext(RadioGruopContext)

  useEffect(() => {
    setVal(checked)
  }, [checked])


  const change = (e: React.BaseSyntheticEvent) => {
    console.log(e, e.target.checked, e.target.name)
    setVal(e.target.checked)
    onChange?.(e)
  }

  return (
    <div className='otaku-radio-container'>
      <label htmlFor='value' className='otaku-radio-label'>
        <input
          type='radio'
          id='value'
          name={context?.name}
          checked={val}
          className='otaku-radio'
          disabled={disabled}
          onChange={change}
        />
        <span className={classNames({
          'otaku-radio-disabled': disabled
        })}>{children}</span>
      </label>
    </div>
  )
}
