import React, { useState } from 'react'
import classNames from 'classnames'
import './style.scss'

interface columnOptions {
  id: string | number
  name: string | number
}

export interface PickerProps {
  columns: columnOptions[]
  value?: string | number
  onChange?: () => void
}

export function  Picker (props: PickerProps) {
  const {
    value = 8,
    columns = []
  } = props
  const [current, setCurrent] = useState(value)

  const wheel = (e: React.BaseSyntheticEvent<WheelEvent>) => {
    setCurrent(e.target.dataset.id)
  }
  const click = (e: React.BaseSyntheticEvent) => {
    setCurrent(e.target.dataset.id)
  }

  return (
    <section className='otaku-picker-box' onWheel={wheel}>
      <ul className='otaku-picker-container'>
        {
          columns.map(item => {
            const { name, id } = item

            return (
              <li 
                key={id} 
                data-id={id}
                className={classNames("otaku-picker-item", {
                  'otaku-picker-item-active': current === `${id}`
                })}
                onClick={click}>{name}</li>
            )
          })
        }
      </ul>
    </section>
    
  )
}