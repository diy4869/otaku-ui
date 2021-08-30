import dayjs from 'dayjs'
import React, { useState, useEffect, MouseEventHandler } from 'react'
import './style.scss'

interface YearProps {
  date?: dayjs.ConfigType
  onChange?: (date?: dayjs.ConfigType) => void
}

export const getYear = (year: number) => {
  const yearList = []
  const start = Math.floor(year / 10) * 10
  for (let i = start - 1; i <= start + 10; i++) {
    yearList.push(i)
  }

  return yearList
}

export function Year (props: YearProps) {
  const {
    date,
    onChange
  } = props

  const [selectDate, setSelectDate] = useState(dayjs(date))
  const year = getYear(selectDate.year())

    useEffect(() => {
      setSelectDate(selectDate)
    }, [selectDate])
  
  const switchYear = (type: 'year' | 'month', direction: 'left' | 'right') => {
    const result = direction === 'left' ? selectDate.subtract(10, type) : selectDate.add(10, type)
     
    setSelectDate(result)
  }

  const onClick = (e: any) => {
    const year = +e.target.dataset.year
    
    if (year) {
      const result = dayjs(selectDate.year(year))

      setSelectDate(result)
      onChange?.(result)
    }
  }

  return (
    <>
      <ul className="b-datetime-picker-header">
        <li>
          <span className={`iconfont b-icon-doubleleft`} onClick={() => switchYear('year', 'left')}></span>
        </li>
        <li>
          <span>{`${year[1]} - ${year[10]}`}</span>
        </li>
        <li>
          <span className={`iconfont b-icon-doubleright`} onClick={() => switchYear('year', 'right')}></span>
        </li>
      </ul>
      <ul className="b-datepicker-year" onClick={onClick}>
        {
          year.map(item => {
            return (
              <li
                data-year={item}
                className={`
                  ${item === year[0] || year[year.length - 1] === item ? 'gray' : ''}
                  ${item === dayjs().year() ? 'b-datepicker-currentYear' : ''}
                  ${selectDate.year() === item ? 'active' : ''}
                `}
                key={item}>
                {item}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}
