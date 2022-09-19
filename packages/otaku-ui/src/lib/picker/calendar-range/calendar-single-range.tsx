import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useCalendar } from '../../../hooks/index'
import { CalendarRange } from './calendar-range'
import { findDataset, getWeek } from '../../../utils'
import { PickerPanel } from '../types'
import './style.scss'

dayjs.extend(isBetween)

export interface CalendarSingleRangeProps {
  className?: string
  date?: dayjs.ConfigType[]
  format?: string
  firstWeek?: '一' | '日'
  lunarDate?: boolean
  disabled?: (date: Dayjs) => boolean
  onChange?: (date: dayjs.ConfigType[]) => void
}

export function CalendarSingleRange (props: CalendarSingleRangeProps) {
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
  const week = getWeek(firstWeek)

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

  const changeDate = (type: PickerPanel) => {
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

  return (
    <CalendarRange date={selectDate}></CalendarRange>
  )
}
