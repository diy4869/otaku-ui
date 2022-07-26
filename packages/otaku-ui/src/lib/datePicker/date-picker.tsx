import React, { useState } from 'react'
import dayjs from 'dayjs'
import { ResultDate, Calendar, Month, Year } from '../picker'
import { Input } from '../input/input'
import { Portal } from '../portal/portal'
import './style.scss'

interface DateTimePickerProps {
  date?: dayjs.ConfigType
  firstWeek?: '日' | '一'
  placeholder?: string
  format?: string
  disabled?: boolean
  clear?: boolean
  lunarDate?: boolean
  onChange?: (date: ResultDate) => void
  disabledDate?: (date: dayjs.ConfigType) => boolean
}

export function DatePicker (props: DateTimePickerProps) {
  const {
    firstWeek,
    disabled,
    lunarDate,
    date = new Date(),
    format = 'YYYY-MM-DD',
    placeholder = '请选择日期',
    clear = true,
    onChange,
    disabledDate
  } = props

  const [selectDate, setSelectDate] = useState(dayjs(date))
  const [showPicker, setShowPicker] = useState('calendar')
  const [inputVal, setInputVal] = useState('')
  const [show, setShow] = useState(false)

  const changeDate = (type: 'month' | 'calendar', date: dayjs.ConfigType) => {
    setSelectDate(dayjs(date))
    setShowPicker(type)
  }

  return (
    <div className="otaku-date-picker-container">
      <Input
        value={inputVal}
        readonly
        disabled={disabled}
        clear={clear}
        placeholder={placeholder}
        onFocus={() => {
          setShow(true)
        }}
        onClear={() => {
          setInputVal('')
          setShow(false)
          setSelectDate(dayjs())
        }}></Input>
      <Portal
        visible={show}
        clickOutSide={() => {
          setShow(false)
          setShowPicker('calendar')
        }}>
        <div
          className="otaku-date-picker"
          style={{
            display: showPicker === 'calendar' ? 'block' : 'none'
          }}>
          <Calendar
            firstWeek={firstWeek}
            date={selectDate}
            lunarDate={lunarDate}
            disabled={disabledDate}
            onChange={date => {
              setSelectDate(date.dayjs)
              setInputVal(dayjs(date.dayjs).format(format))
              onChange?.(date)
              setShow(false)
            }}
            switchPicker={type => {
              setShowPicker(type)
            }}></Calendar>
          {/* <div className='today'>
            <span
              onClick={() => {
                const d = dayjs()
                setSelectDate(d)
                setInputVal(dayjs(d).format(format))
                onChange?.(getDateResult(d))
                setShow(false)
              }}>
              今天
            </span>
          </div> */}
        </div>
        <div
          className="otaku-date-picker"
          style={{
            display: showPicker === 'year' ? 'block' : 'none'
          }}>
          <Year
            date={selectDate}
            onChange={date => changeDate('month', date)}></Year>
        </div>
        <div
          className="otaku-date-picker"
          style={{
            display: showPicker === 'month' ? 'block' : 'none'
          }}>
          <Month
            date={selectDate}
            onChange={date => changeDate('calendar', date)}></Month>
        </div>
      </Portal>
    </div>
  )
}
