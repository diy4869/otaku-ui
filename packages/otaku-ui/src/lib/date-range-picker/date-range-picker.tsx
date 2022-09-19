import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import classNames from 'classnames'
import { CalendarSingleRange, CalendarDoubleRange } from '../picker/calendar-range'
import { Picker } from '../picker'
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
  panelType?: 'single' | 'double'
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
    panelType = 'single',
    format = 'YYYY-MM-DD',
    onCancel,
    onConfirm
  } = props

  const [start, end] = value
  const [startDate, setStartDate] = useState(dayjs(start))
  const [endDate, setEndDate] = useState(end ? dayjs(end) : dayjs(end).add(1, 'month'))
  const [inputVal, setInputVal] = useState('')
  const [show, setShow] = useState(true)
  const [currentIndex, setCurrentIndex] = useState<number>()

  const generator = (count: number) => {
    return Array.from({
      length: count
    }).map((_, index) => {
      return {
        id: index,
        name: `${index}`.padStart(2, '0')
      }
    })
  }

  return (
    <section className="otaku-date-range-picker-container">
      start: {startDate.format('YYYY-MM-DD')} ----- end: {endDate.format('YYYY-MM-DD')}
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
          {panelType === 'single' ? (
            <section className="otaku-date-range-picker-single-panel">
              <CalendarSingleRange
                date={[startDate, endDate]}
                onChange={date => {
                  const [start, end] = date as Dayjs[]
                  setStartDate(start)
                  setEndDate(end)
                }}></CalendarSingleRange>
            </section>
          ) : (
            <section className="otaku-date-range-picker-double-panel">
              <CalendarDoubleRange
                date={[startDate, endDate]}
                onChange={date => {
                  const [start, end] = date as Dayjs[]
                  setStartDate(start)
                  setEndDate(end)
                }}></CalendarDoubleRange>
            </section>
          )}
           <section className='otaku-date-range-picker-time-panel'>
            <ul className='otaku-date-range-picker-time'>
              {
                dayjs().format('HH:mm:ss').split(':').map((time, index) => {
                  return [0, 1].includes(index) ? (
                    <>
                      <li key={index}>{time}</li>
                      <li key={index}>:</li>
                    </>
                  ) : (
                    <li key={index}>{time}</li>
                  )
                })
              }
            </ul>
            <section className='otaku-date-range-picker-time-picker'>
              <Picker columns={generator(24)}></Picker>
              <Picker columns={generator(59)}></Picker>
              <Picker columns={generator(59)}></Picker>
            </section>
          </section>

          {/* <Space className="otaku-date-range-picker-action">
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
          </Space> */}
         
        </section>
        {/* <section>time</section> */}
      </Portal>
    </section>
  )
}
