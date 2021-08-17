import React, { useState } from 'react'
import './style.scss'

interface Data {
  name: string
  id?: string | number
}
interface RadioProps {
  value: string
  data: Data[]
  disabled?: boolean
  children?: React.ReactNode
}

export function Radio (props: RadioProps) {
  const {
    value = '1',
    data = [
      {
        id: '1',
        name: '男'
      },
      {
        id: '2',
        name: '女'
      }
    ],
    disabled
  } = props

  const [
    val,
    setVal
  ] = useState(name)

  const change = (e) => {
    console.log(
      e.target.checked,
      e.target.name
    )
  }

  return (
    <div className="b-radio-container">
      {
        data?.map((item) => (
            <label htmlFor="value" className="b-radio-label">
              <input
                type="radio"
                name={value}
                id="value"
                data-id={item.id}
                className="b-radio"
                disabled={disabled}
                onChange={change}/>
              <span>{item.name}</span>
            </label>
        ))
      }
    </div>
  )
}
