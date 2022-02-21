import React from 'react'
import './style.scss'


interface RadioProps {
  label: string
  value: string
  disabled?: boolean
  children?: React.ReactNode
}

export function Radio (props: RadioProps) {
  const {
    label,
    value,
    disabled
  } = props

  // const [
  //   val,
  //   setVal
  // ] = useState(value)


  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      e.target.checked,
      e.target.name
    )
  }

  return (
    <div className="otaku-radio-container">

            <label htmlFor="value" className="otaku-radio-label">
              <input
                type="radio"
                name={value}
                id="value"
                data-id={label}
                className="otaku-radio"
                disabled={disabled}
                onChange={change}/>
              <span>{value}</span>
            </label>
        ))
    </div>
  )
}
