import React, { useState } from 'react'
import dayjs from 'dayjs'
import { ResultDate, Calendar } from '../picker'
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
  const [inputVal, setInputVal] = useState('')
  const [show, setShow] = useState(false)

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
        className="otaku-date-picker-portal"
        clickOutSide={() => {
          setShow(false)
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
          }}></Calendar>
      </Portal>
    </div>
  )
}
