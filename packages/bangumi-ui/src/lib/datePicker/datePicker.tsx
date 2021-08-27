import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { ResultDate, getDateResult, Calendar, Month, Year } from '../picker'
import { Input } from '../input/input'
import './style.scss'

interface DateTimePickerProps {
  date?: dayjs.ConfigType
  placeholder?: string
  format?: string
  disabled?: boolean
  clear?: boolean
  onChange?: (date: ResultDate) => void
}

export function DatePicker (props: DateTimePickerProps) {
  const {
    date = new Date(),
    format = 'YYYY-MM-DD',
    placeholder = '请选择日期',
    disabled,
    clear = true,
    onChange
  } = props
  
  const [selectDate, setSelectDate] = useState(dayjs(date))
  const [showPicker, setShowPicker] = useState('calendar')
  const [inputVal, setInputVal] = useState('')
  const d = dayjs(selectDate)

  // useEffect(() => {
  //   setInputVal(dayjs(selectDate).format(format))
  // }, [selectDate])

  const change = (type: 'year' | 'month', direction: 'left' | 'right') => {
    const result = direction === 'left' ? d.subtract(1, type) : d.add(1, type)

    setSelectDate(result)
    onChange?.(getDateResult(d, format))
  }
  
  const changeDate = (type: 'month' | 'calendar', date: dayjs.ConfigType) => {
    setSelectDate(dayjs(date))
    setShowPicker(type)
  }

  return (
    <div className="datetime-picker-container">
      <Input
        value={inputVal}
        readonly
        disabled={disabled}
        clear={clear}
        placeholder={placeholder}></Input>
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
                  setInputVal(dayjs(date.dayjs).format(format))
                  onChange?.(date)
                }
              }></Calendar>
            </>
          ) : showPicker === 'year' ? (
            <>
                <Year
                  date={selectDate}
                  onChange={(date) => changeDate('month', date)}></Year>
            </>
            ) : (
              <>
                <Month
                  date={selectDate}
                  onChange={(date) => changeDate('calendar', date)}></Month>
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
                setInputVal(dayjs(d).format(format))
                onChange?.(getDateResult(d, format))
              }}>今天</span>
            ): ''
          }
          </div>
      </div>
    </div>
  )
}
