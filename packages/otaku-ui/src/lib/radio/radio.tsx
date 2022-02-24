import React, { useState, useEffect } from "react"
import classNames from "classnames"
import { Space } from '../space/space'
import "./style.scss"

interface RadioGroupProps {
  children: React.ReactNode[]
}

interface RadioProps {
  value: string
  checked?: boolean
  disabled?: boolean
  children?: React.ReactNode
  onChange?: (e: React.BaseSyntheticEvent) => void
}

export function RadioGroup (props: RadioGroupProps) {
  const {
    children
  } = props

  return (
    <Space>{children}</Space>
    // <ul className="otaku-radio-group-container">
    //   {
    //     children.map((node, index) => {
    //       return (
    //         <li key={index} className="otaku-radio-group-item">{node}</li>
    //       )
    //     })
    //   }
    // </ul>
  )
}

export function Radio(props: RadioProps) {
  const { checked, disabled, children } = props
  const [val, setVal] = useState(checked)

  useEffect(() => {
    setVal(checked)
  }, [checked])


  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked, e.target.name)
    setVal(e.target.checked)
  }

  return (
    <div className='otaku-radio-container'>
      <label htmlFor='value' className='otaku-radio-label'>
        <input
          type='radio'
          id='value'
          checked={checked}
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


