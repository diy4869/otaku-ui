import React, { useState, useEffect } from 'react'
import { timeFormat } from '../../utils'
import './style.scss'

export interface TimeProps {
  value: number
  format?: string
  start?: number
  end?: number
  type?: 'up' | 'down'
  render?: (time: ReturnType<typeof timeFormat>) => React.ReactNode
}


export function Time (props: TimeProps) {
  const {
    value,
    start,
    end = Date.now(),
    type = 'down',
    render
  } = props
  const [time, setTime] = useState(value)
  const [formatTime, setFormatTime] = useState('')

  useEffect(() => {
    setTime(value)
  }, [value])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (type === 'down') {
        setTime(time - 1)
      } else {
        if  (start) {
          setTime(end - start)
        } else {
          setTime(time + 1)
        }
      }

      if (time <= 0) {
        clearTimeout(timeout)
      }

      const obj = timeFormat(time)
      setFormatTime(`${obj.day}天${obj.hour}时${obj.minute}分${obj.second}秒`)      
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [time, type, start, end])
  
  return (
    <div className='otaku-time'>{render?.(timeFormat(time)) || formatTime}</div>
  )
}
