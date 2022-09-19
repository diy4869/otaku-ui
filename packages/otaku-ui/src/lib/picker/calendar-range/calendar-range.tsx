import React, { useEffect, useState, useCallback } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import classNames from 'classnames'
import isBetween from 'dayjs/plugin/isBetween'
import { useCalendar } from '../../../hooks/index'
import { Month } from '../month/month'
import { Year } from '../year/year'
import { findDataset, getWeek } from '../../../utils'
import { PickerPanel } from '../types'
import './style.scss'

dayjs.extend(isBetween)

export interface CalendarRangeProps {
  className?: string
  value?: dayjs.ConfigType[]
  format?: string
  firstWeek?: '一' | '日'
  panel?: 'start' | 'end'
  lunarDate?: boolean
  disabled?: (date: Dayjs) => boolean
  onChange?: (date: Dayjs[]) => void
}

export function CalendarRange (props: CalendarRangeProps) {
  const { className, value = [], firstWeek = '日', panel = 'start', disabled, onChange } = props
  const [start, end] = value
  const [selectDate, setSelectDate] = useState([dayjs(start), dayjs(end)])
  const [resultDate, setResultDate] = useState(selectDate)
  const [date, setDate] = useState(dayjs(panel === 'start' ? start : end))

  const [picker, setPicker] = useState('calendar')
  const calendar = useCalendar(date, firstWeek)
  const week = getWeek(firstWeek)

  useEffect(() => {
    const [start, end] = value
    setSelectDate([dayjs(start), dayjs(end)])
  }, [value])

  const click = (e: React.BaseSyntheticEvent) => {
    const el = findDataset(e.target, 'date')

    if (el) {
      const { date, type, disabled } = el.dataset
      if (disabled !== 'true' && date && type === 'current') {
        if (resultDate.length < 2) {
          const sort = (arr: Dayjs[]) => {
            return [...arr, dayjs(date)].sort((a, b) => {
              return a.toDate().getTime() - b.toDate().getTime()
            })
          }
          const set = new Set(
            sort([...resultDate, dayjs(date)]).map(item =>
              item.format('YYYY-MM-DD')
            )
          )
          const result = [...set].map(item => dayjs(item))
          setResultDate(result)
          setSelectDate(result)
          onChange?.(result)
        } else {
          setResultDate([dayjs(date)])
          setSelectDate([dayjs(date)])
          onChange?.([dayjs(date)])
        }
      }
    }
  }

  const change = (type: PickerPanel, direction: 'left' | 'right') => {
    const result =
      direction === 'left'
        ? date.subtract(1, type)
        : date.add(1, type)
    setDate(result)
  }

  const changeDate = (type: PickerPanel) => {
    setPicker(type)
  }

  const mouseover = (e: React.BaseSyntheticEvent) => {
    console.log(resultDate.map(item => item.format('YYYY-MM-DD')).join(' --- '))
    if (resultDate.length !== 2) {
      const el = findDataset(e.target, 'date')

      if (el) {
        const { date, type, disabled } = el.dataset

        if (disabled !== 'true' && date && type === 'current') {
          selectDate[1] = dayjs(date)
          setSelectDate([...selectDate])
        }
      }
    }
  }

  return (
    <section className={classNames('otaku-calendar-container', className)}>
      {resultDate.map(item => item.format('YYYY-MM-DD')).join(' --- ')}
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
            <span onClick={() => changeDate('year', date)}>
              {date.year()}年
            </span>
            <span onClick={() => changeDate('month', date)}>
              {date.month() + 1}月
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
        <ul
          className="otaku-calendar-month"
          onClick={click}
          onMouseOver={mouseover}>
          {Object.values(calendar).map((item, index) => {
            if (index === 1) {
              return item.map(children => {
                const today = dayjs().format('YYYY-MM-DD')
                const isDisabled = disabled?.(dayjs(children))
                const [start, end] = selectDate
                // console.log(selectDate.for)
                const between = dayjs(children).isBetween(start, end)

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
                        'otaku-calendar-disabled': isDisabled,
                        'otaku-calendar-range-start':
                          start.format('YYYY-MM-DD') === children,
                        'otaku-calendar-range-end':
                          end?.format('YYYY-MM-DD') === children
                      }
                    )}>
                    <span
                      className={classNames({
                        'otaku-calendar-between': end ? between : false
                      })}>
                      {dayjs(children).date()}
                    </span>
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
        <Year date={date} onChange={() => changeDate('month')}></Year>
      </div>
      <div
        style={{
          display: picker === 'month' ? 'block' : 'none'
        }}>
        <Month date={date} onChange={() => changeDate('calendar')}></Month>
      </div>
    </section>
  )
}
