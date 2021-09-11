import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useCalendar } from '../../../hooks/index'
import './style.scss'

dayjs.extend(isBetween)

export interface ResultDate {
  dayjs: Dayjs
  dateFormat: string
  date: Date
  timestamp: number
}

interface CalendarProps {
  date?: dayjs.ConfigType
  disabled?: (date: ResultDate) => boolean | boolean
  onClick?: (date: ResultDate) => void
  format?: string
  firstWeek?: '一' | '日'
}

export const getDateResult = (date: dayjs.ConfigType = new Date(), format: string = 'YYYY-MM-DD') => {
  const d = dayjs(date)

  return {
    dayjs: d,
    dateFormat: d.format(format),
    date: d.toDate(),
    timestamp: d.toDate().getTime()
  }
}


export function Calendar (props: CalendarProps) {
  const {
    date,
    firstWeek = '日',
    format = 'YYYY-MM-DD',
    disabled,
    onClick
  } = props

  const [
    selectDate,
    setSelectDate
  ] = useState(dayjs(date).format('YYYY-M-D'))
  const calendar = useCalendar(selectDate, firstWeek)
  const d = dayjs(selectDate)
  const currentYear = d.year()
  const currentMonth = d.month()

  const arr = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六'
  ]
  const week = firstWeek === '一' ? [...arr, '日'] : ['日', ...arr]

  useEffect(
    () => {
      setSelectDate(dayjs(date).format('YYYY-M-D'))
      console.log(date, dayjs(selectDate).format('YYYY-M-D'))
    },
    [date, selectDate]
  )


  const getDate = (date: number, type: 'prev' | 'next') => {
    const method = type === 'prev' ? 'subtract' : 'add'
    const month = d[method](
      1,
      'month'
    )

    return dayjs(
      new Date(
        month.year(),
        month.month(),
        date
      )
    ).format('YYYY-M-D')
  }
  // @ts-ignore
  const click = (e) => {
    const { type, date, disabled } = e.target.dataset
    console.log(e)
    if (disabled !== 'true' && date && type === 'current') {
      setSelectDate(date)
      onClick?.(getDateResult(date, format))
    }
  }


  return (
    <div className="otaku-calendar-container">
      <ul className="otaku-calendar-week">
        {
          week.map((item, index) => (
              <li key={index}>{item}</li>
          ))
        }
      </ul>
      <ul className="otaku-calendar-month" onClick={click}>
        {
          Object.values(calendar).map((item, index) => {
            if (index === 1) {
              return item.map((children) => {
                /**
                 * TODO 范围判断
                 * const start = '2021-08-03'
                 * const end = `2021-08-25`
                 * const isBetween = dayjs(date).isBetween(start, end)
                 */

                const date = `${currentYear}-${currentMonth + 1}-${children}`
                const today = dayjs().format('YYYY-M-D')
                const isDisabled = typeof disabled === 'function' ? disabled(getDateResult(date, format)) : disabled
                
                return (
                  <li
                    key={date}
                    data-date={date}
                    data-disabled={isDisabled}
                    data-type="current"
                    className={`
                      otaku-calender-date
                      otaku-calendar-current
                      ${isDisabled ? 'otaku-calendar-disabled' : ''}
                      ${today === date ? 'otaku-calendar-today' : ''}
                      ${selectDate === date ? 'otaku-calendar-active' : ''}
                    `}>
                    {children}
                  </li>
                )
              })
            }
            
            return item.map((children) => {
              const type = index === 0 ? 'prev' : 'next'
              const date = getDate(
                children,
                type
              )

              return (
                <li
                  key={date}
                  data-date={date}
                  className={`
                    otaku-calender-date
                    otaku-calendar-${type}
                  `}>
                  {children}
                </li>
              )
            })
          })
        }
      </ul>
    </div>
  )
}
