import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import classNames from 'classnames'
import isBetween from 'dayjs/plugin/isBetween'
import { useCalendar } from '../../../hooks/index'
import { Month } from '../month/month'
import { Year } from '../year/year'
import { findDataset } from '../../../utils'
import { PickerPanel } from '../types'
import './style.scss'

dayjs.extend(isBetween)

export interface CalendarRangeProps {
  className?: string
  date?: dayjs.ConfigType[]
  format?: string
  firstWeek?: '一' | '日'
  lunarDate?: boolean
  disabled?: (date: Dayjs) => boolean
  onChange?: (date: dayjs.ConfigType[]) => void
}

export function CalendarRange (props: CalendarRangeProps) {
  const {
    className,
    date = [dayjs(), dayjs()],
    firstWeek = '日',
    disabled,
    onChange
  } = props

  const [ start, end ] = date
  const [selectDate, setSelectDate] = useState([dayjs(start), dayjs(end)])
  const [startDate, setStartDate] = useState(dayjs(start))

  const [picker, setPicker] = useState('calendar')
  const calendar = useCalendar(startDate, firstWeek)
  const arr = ['一', '二', '三', '四', '五', '六']
  const week = firstWeek === '一' ? [...arr, '日'] : ['日', ...arr]

  useEffect(() => {
    const [start, end] = date
    setSelectDate([dayjs(start), dayjs(end)])
  }, [date])

  const click = (e: React.BaseSyntheticEvent) => {
    const el = findDataset(e.target, 'date')

    if (el) {
      const { date, type, disabled } = el.dataset

      if (disabled !== 'true' && date && type === 'current') {
        if (selectDate.length < 2) {
          const result = [...selectDate, dayjs(date)].sort((a, b) => {
            return a.toDate().getTime() - b.toDate().getTime()
          }) as [Dayjs, Dayjs]
          setSelectDate(result)
          onChange?.(result)
        } else {
          setSelectDate([dayjs(date)])
          // onChange?.([dayjs(date)])
        }
      }
    }
  }

  const change = (type: PickerPanel, direction: 'left' | 'right') => {
    const result =
      direction === 'left'
        ? startDate.subtract(1, type)
        : startDate.add(1, type)
        setStartDate(result)
  }

  const changeDate = (type: PickerPanel, date: dayjs.ConfigType) => {
    // setSelectDate(dayjs(date))
    setPicker(type)
  }

  const mouseover = (e: React.BaseSyntheticEvent) => {
    if (selectDate.length < 1) return
    const el = findDataset(e.target, 'date')

    if (el) {
      const { date, type, disabled } = el.dataset

      if (disabled !== 'true' && date && type === 'current') {
        selectDate[1] = dayjs(date)
        setSelectDate([...selectDate])
      }
    }
  }

  const mouseout = () => {

  }

  return (
    <section className={classNames('otaku-calendar-container', className)}>
      start: {selectDate[0]?.format('YYYY-MM-DD')}
      end: {selectDate[1]?.format('YYYY-MM-DD')}
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
            <span onClick={() => changeDate('year', startDate)}>
              {startDate.year()}年
            </span>
            <span onClick={() => changeDate('month', startDate)}>
              {startDate.month() + 1}月
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
        <ul className="otaku-calendar-month" onClick={click} onMouseOver={mouseover}>
          {Object.values(calendar).map((item, index) => {
            if (index === 1) {
              return item.map(children => {
                const today = dayjs().format('YYYY-MM-DD')
                const isDisabled = disabled?.(dayjs(children))
                const [start, end = dayjs() ] = selectDate
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
                        'otaku-calendar-between': between,
                        'otaku-calendar-range-start': start.format('YYYY-MM-DD') === children,
                        'otaku-calendar-range-end': end?.format('YYYY-MM-DD') === children
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
          date={startDate}
          onChange={date => changeDate('month', date)}></Year>
      </div>
      <div
        style={{
          display: picker === 'month' ? 'block' : 'none'
        }}>
        <Month
          date={startDate}
          onChange={date => changeDate('calendar', date)}></Month>
      </div>
    </section>
  )
}
