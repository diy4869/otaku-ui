import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Calendar } from '../picker'
import { Input } from '../input/input'
import { Portal } from '../portal/portal'
import { Button } from '../button/button'
import './date-range-picker.scss'
import { Space } from '../space/space'

export interface DateRangePickerProps {
  value: [dayjs.ConfigType, dayjs.ConfigType]
  disabled?: boolean
  format?: string
  onCancel?: () => void
  onConfirm?: (date: [Dayjs, Dayjs]) => void
}

export interface DateRangePickerContextOptions {
  start: Dayjs
  end: Dayjs
}

export const DateRangePickerContext = React.createContext<DateRangePickerContextOptions | null>(null)

export function DateRangePicker (props: DateRangePickerProps) {
  const { 
      value = [], 
      disabled, 
      format = 'YYYY-MM-DD',
      onCancel,
      onConfirm
  } = props

  const [start, end] = value
  const [startDate, setStartDate] = useState(dayjs(start))
  const [endDate, setEndDate] = useState(dayjs(end).add(5, 'day'))
  const [inputVal, setInputVal] = useState('')
  const [show, setShow] = useState(false)
  

  // useEffect(() => {
  //   setRangeDate(value)
  // }, [value])

  return (
    <section className="otaku-date-range-picker-container">
      <Input
        value={inputVal}
        readonly
        disabled={disabled}
        onFocus={() => {
          setShow(true)
        }}
        onClear={() => {
          setInputVal('')
          setShow(false)
        }}></Input>
      <Portal
        visible={show}
        clickOutSide={() => {
          setShow(false)
        }}>
        <section className="otaku-date-range-picker">
          <section className="otaku-date-range-picker-calender">
            <DateRangePickerContext.Provider value={{
              start: startDate,
              end: endDate
            }}>
              <Calendar 
                date={startDate} 
                disabled={(date) => {
                  return date.isAfter(endDate)
                }} 
                onChange={(date) => {
                  setStartDate(dayjs(date.dayjs))
                }}></Calendar>
              <Calendar 
                date={endDate} 
                disabled={(date) => {
                  return date.isBefore(startDate)
                }} 
                onChange={(date) => {
                  setEndDate(dayjs(date.dayjs))
                }}></Calendar>
            </DateRangePickerContext.Provider>
           
          </section>
          <Space className="otaku-date-range-picker-action">
            <Button onClick={() => {
              setShow(false)
              onCancel?.()
            }}>取消</Button>
            <Button type="primary" onClick={() => {
              setShow(false)
              setStartDate(startDate)
              setEndDate(endDate)
              setInputVal(
                `${startDate.format(format)} --- ${endDate.format(format)}`
              )
              onConfirm?.([startDate, endDate])
            }}>确定</Button>
          </Space>
        </section>
      </Portal>
    </section>
  )
}
