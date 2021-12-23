import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { Lunar } from 'lunar-typescript'
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
  firstWeek?: '一' | '日',
  lunarDate?: boolean
}

export const getDateResult = (date: dayjs.ConfigType = new Date(), format = 'YYYY-MM-DD') => {
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
    lunarDate = false,
    disabled,
    onClick
  } = props

  const [
    selectDate,
    setSelectDate
  ] = useState(dayjs(date).format('YYYY-M-D'))
  const calendar = useCalendar(selectDate, firstWeek)

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
    },
    [date, selectDate]
  )

  const click = (e) => {
    const dataset = e.target.tagName === 'SPAN' ? e.target.parentElement.dataset : e.target.dataset
    const { type, date, disabled } = dataset
    
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
                const lunar = Lunar.fromDate(dayjs(children).toDate()).getDayInChinese()
                const today = dayjs().format('YYYY-M-D')
                const isDisabled = typeof disabled === 'function' ? disabled(getDateResult(children, format)) : disabled
                
                return (
                  <li
                    key={children}
                    data-date={children}
                    data-disabled={isDisabled}
                    data-type="current"
                    className={`
                      otaku-calender-date
                      otaku-calendar-current
                      ${isDisabled ? 'otaku-calendar-disabled' : ''}
                      ${today === children ? 'otaku-calendar-today' : ''}
                      ${selectDate === children ? 'otaku-calendar-active' : ''}
                    `}>
                    <span>{dayjs(children).date()}</span>
                    {lunarDate && <span>{lunar}</span>}
                  </li>
                )
              })
            }
            
            return item.map((children) => {
              const type = index === 0 ? 'prev' : 'next'
              const lunar = Lunar.fromDate(dayjs(children).toDate()).getDayInChinese()

              return (
                <li
                  key={children}
                  data-date={children}
                  className={`
                    otaku-calender-date
                    otaku-calendar-${type}
                  `}>
                  <span>{dayjs(children).date()}</span>
                  {lunarDate && <span>{lunar}</span>}
                </li>
              )
            })
          })
        }
      </ul>
    </div>
  )
}
