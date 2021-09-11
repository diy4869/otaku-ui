import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import './style.scss'

interface MonthProps {
  date?: dayjs.ConfigType
  onChange?: (month?: dayjs.ConfigType) => void
}

export function Month(props: MonthProps) {
  const {
    date,
    onChange
  } = props
  const [selectDate, setSelectDate] = useState(dayjs(date))

  
  useEffect(() => {
    setSelectDate(selectDate)
  }, [selectDate])

  const switchMonth = (type: 'year' | 'month', direction: 'left' | 'right') => {
    const result = direction === 'left' ? selectDate.subtract(1, type) : selectDate.add(1, type)
     
    setSelectDate(result)
  }

  const onClick = (month: number) => {
    const result = selectDate.month(month)
    setSelectDate(result)
    onChange?.(result)
  }

  return (
    <>
      <ul className="otaku-datetime-picker-header">
        <li>
          <span className={`iconfont otaku-icon-doubleleft`} onClick={() => switchMonth('year', 'left')}></span>
        </li>
        <li>
          <span>{`${selectDate.year()}年`}</span>
        </li>
        <li>
          <span className={`iconfont otaku-icon-doubleright`} onClick={() => switchMonth('year', 'right')}></span>
        </li>
      </ul>
      <ul className="otaku-month">
        {
          Array(12).fill(undefined).map((_, index) => {
            const m = index + 1

            return (
              <li
                className={`
                  otaku-month-item
                  ${m === dayjs().month() + 1 ? 'otaku-datepicker-currentMonth' : ''}
                  ${selectDate.month() + 1 === m ? 'active' : ''}
                `}
                onClick={() => onClick(index)}>
                {m}月</li>
            )
          })
        }
      </ul>
    </>

  )
}
