import React, { useState, useEffect, useMemo } from 'react'
import './style.scss'

export interface CountDownProps {
  value: number
  type?: 'up' | 'down'
}

const timeFormat = (time: number) => {
  const day = time / 86400 >> 0
  const hour = time % 86400 / 3600 >> 0
  const minute = time % 86400 % 3600 / 60 >> 0
  const second = time % 86400 % 3600 % 60 >> 0

  return {
    day,
    hour,
    minute,
    second
  }
}


export function CountDown (props: CountDownProps) {
  const {
    value,
    type = 'down'
  } = props
  const [time, setTime] = useState(value)
  const [formatTime, setFormatTime] = useState()

  useEffect(() => {
    setTime(value)
  }, [value])

  useEffect(() => {
    const timeout = setTimeout(() => {
      type === 'down' ? setTime(time - 1) : setTime(time + 1)

      if (time <= 0) {
        clearTimeout(timeout)
      }

      console.log(time, timeFormat(time))
      // console.log('%d 天 %d 时 %d 分 %d 秒', day, hour, minute, second)
      // setFormatTime(value)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [time, type])
  
  return (
    <div>{time}</div>
  )
}
