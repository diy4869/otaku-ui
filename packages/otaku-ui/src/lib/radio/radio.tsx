import React from 'react'
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
      {
        data?.map((item, index) => (
            <label htmlFor="value" className="otaku-radio-label" key={index}>
              <input
                type="radio"
                name={value}
                id="value"
                data-id={item.id}
                className="otaku-radio"
                disabled={disabled}
                onChange={change}/>
              <span>{item.name}</span>
            </label>
        ))
      }
    </div>
  )
}
