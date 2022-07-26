import React, { useEffect, useState, useContext } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import classNames from 'classnames'
import isBetween from 'dayjs/plugin/isBetween'
import { Lunar } from 'lunar-typescript'
import { useCalendar } from '../../../hooks/index'
import { DateRangePickerContext } from '../../datePicker/date-range-picker'
import './style.scss'

dayjs.extend(isBetween)

export interface ResultDate {
  dayjs: Dayjs
  date: Date
  timestamp: number
}

interface CalendarProps {
  date?: dayjs.ConfigType
  format?: string
  firstWeek?: '一' | '日'
  lunarDate?: boolean
  disabled?: (date: Dayjs) => boolean
  onChange?: (date: ResultDate) => void
  switchPicker?: (type: 'year' | 'month' | 'calendar') => void
}

export const getDateResult = (date: dayjs.ConfigType = new Date()) => {
  const d = dayjs(date)

  return {
    dayjs: d,
    date: d.toDate(),
    timestamp: d.toDate().getTime()
  }
}

export function Calendar (props: CalendarProps) {
  const {
    date,
    firstWeek = '日',
    lunarDate = false,
    disabled,
    onChange,
    switchPicker
  } = props

  const DateRangePicker = useContext(DateRangePickerContext)
  const [selectDate, setSelectDate] = useState(dayjs(date))
  const calendar = useCalendar(selectDate, firstWeek)

  const arr = ['一', '二', '三', '四', '五', '六']
  const week = firstWeek === '一' ? [...arr, '日'] : ['日', ...arr]

  useEffect(() => {
    setSelectDate(dayjs(date))
  }, [date])

  const click = (e: React.BaseSyntheticEvent) => {
    const dataset =
      e.target.tagName === 'SPAN'
        ? e.target.parentElement.dataset
        : e.target.dataset
    const { type, date, disabled } = dataset

    if (disabled !== 'true' && date && type === 'current') {

      setSelectDate(dayjs(date))
      onChange?.(getDateResult(date))
    }
  }

  const change = (type: 'year' | 'month', direction: 'left' | 'right') => {
    const result =
      direction === 'left'
        ? selectDate.subtract(1, type)
        : selectDate.add(1, type)

    setSelectDate(result)
    onChange?.(getDateResult(selectDate))
  }

  return (
    <div className="otaku-calendar-container">
      <ul className="otaku-date-picker-header">
        <li>
          <span
            className={`iconfont otaku-icon-doubleleft`}
            onClick={() => change('year', 'left')}></span>
          <span
            className={`iconfont otaku-icon-left`}
            onClick={() => change('month', 'left')}></span>
        </li>
        <li>
          <span
            onClick={() => {
              switchPicker?.('year')
            }}>
            {selectDate.year()}年
          </span>
          <span
            onClick={() => {
              switchPicker?.('month')
            }}>
            {selectDate.month() + 1}月
          </span>
        </li>
        <li>
          <span
            className={`iconfont otaku-icon-right`}
            onClick={() => change('month', 'right')}></span>
          <span
            className={`iconfont otaku-icon-doubleright`}
            onClick={() => change('year', 'right')}></span>
        </li>
      </ul>
      <ul className="otaku-calendar-week">
        {week.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ul className="otaku-calendar-month" onClick={click}>
        {Object.values(calendar).map((item, index) => {
          if (index === 1) {
            return item.map(children => {
              /**
               * TODO 范围判断
               * const start = '2021-08-03'
               * const end = `2021-08-25`
               * const isBetween = dayjs(date).isBetween(start, end)
               */
              // const lunar = Lunar.fromDate(
              //   dayjs(children).toDate()
              // ).getDayInChinese()
              const today = dayjs().format('YYYY-M-D')
              const isDisabled = disabled?.(dayjs(children))

              console.log(DateRangePicker?.start.format('YYYY-MM-DD'), DateRangePicker?.end.format('YYYY-MM-DD'))

              return (
                <li
                  key={children}
                  data-date={children}
                  data-disabled={isDisabled}
                  data-type="current"
                  className={classNames(
                    ['otaku-calender-date', 'otaku-calendar-current'],
                    {
                      'otaku-calendar-today': today === children,
                      'otaku-calendar-active':
                        selectDate.format('YYYY-M-D') === children,
                        'otaku-calendar-disabled': isDisabled,
                      'otaku-calendar-between': dayjs(children).isBetween(DateRangePicker?.start, DateRangePicker?.end)
                    }
                  )}>
                  <span>{dayjs(children).date()}</span>
                  {/* {lunarDate && <span>{lunar}</span>} */}
                </li>
              )
            })
          }

          return item.map(children => {
            const type = index === 0 ? 'prev' : 'next'
            // const lunar = Lunar.fromDate(
            //   dayjs(children).toDate()
            // ).getDayInChinese()

            return (
              <li
                key={children}
                data-date={children}
                className={`otaku-calender-date otaku-calendar-${type}`}>
                <span>{dayjs(children).date()}</span>
                {/* {lunarDate && <span>{lunar}</span>} */}
              </li>
            )
          })
        })}
      </ul>
    </div>
  )
}
