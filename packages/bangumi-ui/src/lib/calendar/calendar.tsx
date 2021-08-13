import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { useCalendar } from '../../hooks/index'
import './style.scss'

interface CalendarProps {
  date?: dayjs.ConfigType
  onclick?: (date: string) => void
}

export function Calendar (props: CalendarProps) {
  const {
    date,
    onclick
  } = props
  const d = dayjs(date)
  const [week] = useState(['一', '二', '三', '四', '五', '六', '日'])
  const [selectDate, setSelectDate] = useState(d.format('YYYY-M-D'))
  const calendar = useCalendar(selectDate)
  const currentYear = d.year()
  const currentMonth = d.month()

  useEffect(() => {
    setSelectDate(dayjs(date).format('YYYY-M-D'))
  }, [date])


  const getDate = (date: number, type: 'prev' | 'next') => {
    const method = type === 'prev' ? 'subtract' : 'add'
    const month = d[method](1, 'month')

    return dayjs(new Date(month.year(), month.month(), date)).format('YYYY-MM-DD')
  }

  const click = (e) => {
    const { type, date } = e.target.dataset

    if (type === 'current') {
      setSelectDate(date)
      onclick?.(date)
    }
    
  }

  return (
    <div className="b-calendar-container">
      <ul className="b-calendar-week">
        {
          week.map((item, index) => {
            return (
              <li key={index}>{item}</li>
            )
          })
        }
      </ul>
      <ul className="b-calendar-month" onClick={click}>
        {
          Object.values(calendar).map((item, index) => {
            if (index === 1) {
              return item.map(children => {
                const date = `${currentYear}-${currentMonth + 1}-${children}`

                return (
                  <li 
                    key={date}
                    data-date={date}
                    data-type="current"
                    className={`b-calender-date b-calendar-current ${selectDate === date ? 'b-calendar-active' : ''}`}>
                    {children}
                  </li>
                )
              })
            } else {
              return item.map(children => {
                const type = index === 0 ? 'prev' : 'next'
                const date = getDate(children, type)

                return (
                  <li 
                    key={date}
                    data-date={date}
                    className={`b-calender-date b-calendar-${type}`}>
                    {children}
                  </li>
                )
              })
            }
          })
        }
      </ul>
    </div>
  )
}
