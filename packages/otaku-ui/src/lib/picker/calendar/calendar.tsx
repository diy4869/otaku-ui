import React, { useEffect, useState, useContext } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import classNames from 'classnames'
import isBetween from 'dayjs/plugin/isBetween'
import { Lunar } from 'lunar-typescript'
import { useCalendar } from '../../../hooks/index'
import { DateRangePickerContext } from '../../datePicker/date-range-picker'
import { Month } from '../month/month'
import { Year } from '../year/year'
import './style.scss'

dayjs.extend(isBetween)

export interface ResultDate {
  dayjs: Dayjs
  date: Date
  timestamp: number
}

export interface CalendarProps {
  className?: string
  date?: dayjs.ConfigType
  format?: string
  firstWeek?: '一' | '日'
  lunarDate?: boolean
  disabled?: (date: Dayjs) => boolean
  onChange?: (date: ResultDate) => void
}

export type PickerPanel = 'year' | 'month' | 'calendar'

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
    lunarDate = false,
    disabled,
    onChange
  } = props

  const DateRangePicker = useContext(DateRangePickerContext)
  const [selectDate, setSelectDate] = useState(dayjs(date))
  const [picker, setPicker] = useState('calendar')
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
                // const lunar = Lunar.fromDate(
                //   dayjs(children).toDate()
                // ).getDayInChinese()
                const today = dayjs().format('YYYY-MM-DD')
                const isDisabled = disabled?.(dayjs(children))
                const between = dayjs(children).isBetween(
                  DateRangePicker?.start,
                  DateRangePicker?.end
                )

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
                        'otaku-calendar-disabled': isDisabled,
                        'otaku-calendar-between': between
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
