import React, { useState, useEffect } from 'react'
import { timeFormat } from '../../utils'
import './style.scss'

export interface TimeProps {
  value: number
  format?: string
  type?: 'up' | 'down'
  render?: (time?: ReturnType<typeof timeFormat>) => React.ReactNode
}


export function Time (props: TimeProps) {
  const {
    value,
    type = 'down'
  } = props
  const [time, setTime] = useState(value)
  const [formatTime, setFormatTime] = useState('')

  useEffect(() => {
    setTime(value)
  }, [value])

  useEffect(() => {
    const timeout = setTimeout(() => {
      type === 'down' ? setTime(time - 1) : setTime(time + 1)

      if (time <= 0) {
        clearTimeout(timeout)
      }

      const obj = timeFormat(time)
      
      setFormatTime(`${obj.day}天${obj.hour}时${obj.minute}分${obj.second}秒`)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [time, type])
  
  return (
    <div>{formatTime}</div>
  )
}
