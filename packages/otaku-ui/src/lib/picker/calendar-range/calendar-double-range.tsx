import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import classNames from 'classnames'
import isBetween from 'dayjs/plugin/isBetween'
import { useCalendar } from '../../../hooks/index'
import { CalendarRange } from './calendar-range'
import { findDataset, getWeek } from '../../../utils'
import { PickerPanel } from '../types'
import './style.scss'

dayjs.extend(isBetween)

export interface CalendarDoubleRangeProps {
  className?: string
  date?: dayjs.ConfigType[]
  format?: string
  firstWeek?: '一' | '日'
  lunarDate?: boolean
  disabled?: (date: Dayjs) => boolean
  onChange?: (date: dayjs.ConfigType[]) => void
}

export function CalendarDoubleRange (props: CalendarDoubleRangeProps) {
  const {
    className,
    date = [dayjs(), dayjs()],
    firstWeek = '日',
    disabled,
    onChange
  } = props
  const [ start, end ] = date
  const [selectDate, setSelectDate] = useState([dayjs(start), dayjs(end)])

  return (
    <>
      <CalendarRange date={selectDate}></CalendarRange>
      <CalendarRange date={selectDate}></CalendarRange>
    </>
  )
}
