import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import classNames from 'classnames'
import { useCalendar } from '../../../hooks/index'
import { Month } from '../month/month'
import { Year } from '../year/year'
import { findDataset, getWeek } from '../../../utils'
import type { ResultDate, PickerPanel } from '../types'
import './style.scss'


export interface CalendarProps {
  className?: string
  date?: dayjs.ConfigType
  format?: string
  firstWeek?: '一' | '日'
  lunarDate?: boolean
  range?: boolean
  disabled?: (date: Dayjs) => boolean
  onChange?: (date: ResultDate) => void
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
    className,
    date,
    firstWeek = '日',
    disabled,
    onChange
  } = props

  const [selectDate, setSelectDate] = useState(dayjs(date))
  const [picker, setPicker] = useState('calendar')
  const calendar = useCalendar(selectDate, firstWeek)
  const week = getWeek(firstWeek)

  useEffect(() => {
    setSelectDate(dayjs(date))
  }, [date])

  const click = (e: React.BaseSyntheticEvent) => {
    const el = findDataset(e.target, 'date')

    if (el) {
      console.log(el)
      const { date, type, disabled } = el.dataset

      if (disabled !== 'true' && date && type === 'current') {
        setSelectDate(dayjs(date))
        onChange?.(getDateResult(date))
      }
    }
  }

  const change = (type: PickerPanel, direction: 'left' | 'right') => {
    const result =
      direction === 'left'
        ? selectDate.subtract(1, type)
        : selectDate.add(1, type)
    setSelectDate(result)
  }

  const changeDate = (type: PickerPanel, date: dayjs.ConfigType) => {
    setSelectDate(dayjs(date))
    setPicker(type)
  }

  return (
    <section className={classNames('otaku-calendar-container', className)}>
      <div
        style={{
          display: picker === 'calendar' ? 'block' : 'none'
        }}>
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
            <span onClick={() => changeDate('year', selectDate)}>
              {selectDate.year()}年
            </span>
            <span onClick={() => changeDate('month', selectDate)}>
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
                const today = dayjs().format('YYYY-MM-DD')
                const isDisabled = disabled?.(dayjs(children))

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
                          selectDate.format('YYYY-MM-DD') === children,
                        'otaku-calendar-disabled': isDisabled
                      }
                    )}>
                    <span>{dayjs(children).date()}</span>
                  </li>
                )
              })
            }

            return item.map(children => {
              const type = index === 0 ? 'prev' : 'next'

              return (
                <li
                  key={children}
                  data-date={children}
                  className={`otaku-calender-date otaku-calendar-${type}`}>
                  <span>{dayjs(children).date()}</span>
                </li>
              )
            })
          })}
        </ul>
      </div>
      <div
        style={{
          display: picker === 'year' ? 'block' : 'none'
        }}>
        <Year
          date={selectDate}
          onChange={date => changeDate('month', date)}></Year>
      </div>
      <div
        style={{
          display: picker === 'month' ? 'block' : 'none'
        }}>
        <Month
          date={selectDate}
          onChange={date => changeDate('calendar', date)}></Month>
      </div>
    </section>
  )
}
