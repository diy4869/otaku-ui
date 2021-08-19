import React, { useState } from 'react'
import dayjs from 'dayjs'
import { ResultDate, getDateResult, Calendar, Month, Year } from '../picker'
import './style.scss'

interface DateTimePickerProps {
  date?: dayjs.ConfigType
  format?: string,
  onChange?: (date: ResultDate) => void
}

export function DateTimePicker (props: DateTimePickerProps) {
  const {
    date = new Date(),
    format = 'YYYY-MM-DD',
    onChange
  } = props
  
  const [selectDate, setSelectDate] = useState(date)
  const [showPicker, setShowPicker] = useState('calendar')
  const d = dayjs(selectDate)

  const change = (type: 'year' | 'month', direction: 'left' | 'right') => {
    const result = direction === 'left' ? d.subtract(1, type) : d.add(1, type)

    setSelectDate(result)
    onChange?.(getDateResult(d, format))
  }

  const changeDate = (type: 'year' | 'month') => {
    if (type === 'year') {
      setShowPicker('year')
    } 
  }

  return (
    <div className="b-datetime-picker">
      {
        showPicker === 'calendar' ? (
          <>
            <ul className="b-datetime-picker-header">
              <li>
                <span className={`iconfont b-icon-doubleleft`} onClick={() => change('year', 'left')}></span>
                <span className={`iconfont b-icon-left`} onClick={() => change('month', 'left')}></span>
              </li>
              <li>
                <span onClick={() => setShowPicker('year')}>{d.year()}年</span>
                <span onClick={() => setShowPicker('month')}>{d.month() + 1}月</span>
              </li>
              <li>
                <span className={`iconfont b-icon-right`} onClick={() => change('month', 'right')}></span>
                <span className={`iconfont b-icon-doubleright`} onClick={() => change('year', 'right')}></span>
              </li>
            </ul>
            <Calendar
              date={selectDate}
              onClick={(date) => {
                setSelectDate(date.dayjs)
                onChange?.(date)
              }
            }></Calendar>
          </>
        ) : showPicker === 'year' ? (
          <>
              <Year
                date={selectDate}
                onChange={(date) => {
                  setSelectDate(dayjs(date))
                  setShowPicker('month')
                }
              }></Year>
          </>
          ) : (
            <>
                <Month
                  date={selectDate}
                    onChange={(date) => {
                      setSelectDate(dayjs(date))
                      setShowPicker('calendar')
                  }
                }></Month>
          </>
        )
      }

      <div className="today">
        {
          showPicker === 'calendar' ? (
            <span
            onClick={() => {
              const d = dayjs()
              setSelectDate(d)
              onChange?.(getDateResult(d, format))
            }}>今天</span>
          ): ''
        }
        </div>
    </div>
  )
}
