import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import classNames from 'classnames'
import { CalendarRange } from '../picker'
import { Input } from '../input/input'
import { Portal } from '../portal/portal'
import { Button } from '../button/button'
import { Space } from '../space/space'
import './date-range-picker.scss'

export interface PickerOptions {
  onChange?: (date: [Dayjs, Dayjs]) => void
}

export interface shortcutOptions {
  name: string
  onClick: (picker: PickerOptions) => void
}

export interface DateRangePickerProps {
  value: [dayjs.ConfigType, dayjs.ConfigType]
  disabled?: boolean
  format?: string
  shortcut?: shortcutOptions[]
  onCancel?: () => void
  onConfirm?: (date: [Dayjs, Dayjs]) => void
}

export interface DateRangePickerContextOptions {
  start: Dayjs
  end: Dayjs
}

export function DateRangePicker (props: DateRangePickerProps) {
  const {
    disabled,
    shortcut = [],
    value = [],
    format = 'YYYY-MM-DD',
    onCancel,
    onConfirm
  } = props

  const [start, end] = value
  const [selectDate, setSelectDate] = useState<[dayjs.ConfigType, dayjs.ConfigType]>([dayjs(start), dayjs(end)])
  const [startDate, setStartDate] = useState(dayjs(start))
  const [endDate, setEndDate] = useState(dayjs(end))
  const [inputVal, setInputVal] = useState('')
  const [show, setShow] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>()

  


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
          <ul
            className="otaku-date-range-picker-shortcut"
            style={{
              display: shortcut.length === 0 ? 'none' : 'block'
            }}>
            {shortcut.map((item, index) => {
              return (
                <li
                  key={index}
                  className={classNames({
                    active: currentIndex === index
                  })}
                  onClick={() => {
                    const picker: PickerOptions = {
                      onChange (date) {
                        const [start, end] = date
                        onConfirm?.([dayjs(start), dayjs(end)])
                        setInputVal(
                          `${startDate.format(format)} --- ${endDate.format(
                            format
                          )}`
                        )
                        setShow(false)
                      }
                    }
                    setCurrentIndex(index)
                    item.onClick(picker)
                  }}>
                  {item.name}
                </li>
              )
            })}
          </ul>
          <section className="otaku-date-range-picker-calender">
            <CalendarRange
              date={selectDate}
              onChange={date => {
                console.log(date)
                setSelectDate([...date])
              }}></CalendarRange>
            <CalendarRange 
                date={selectDate}
                onChange={(date) => {
                  setSelectDate([...date])
                }}></CalendarRange>
          </section>
          <Space className="otaku-date-range-picker-action">
            <Button
              onClick={() => {
                setShow(false)
                onCancel?.()
              }}>
              取消
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setShow(false)
                setStartDate(startDate)
                setEndDate(endDate)
                setInputVal(
                  `${startDate.format(format)} --- ${endDate.format(format)}`
                )
                onConfirm?.([startDate, endDate])
              }}>
              确定
            </Button>
          </Space>
        </section>
      </Portal>
    </section>
  )
}
