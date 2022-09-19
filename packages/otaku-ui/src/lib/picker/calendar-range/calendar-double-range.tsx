import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { CalendarRange } from './calendar-range'
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
    date = [dayjs(), dayjs()],
    onChange
  } = props
  const [ start, end ] = date
  const [selectDate, setSelectDate] = useState([dayjs(start), dayjs(end)])

  const change = (date: Dayjs[]) => {
    console.log('-----', date.map(item => item.format('YYYY-MM-DD')))
    setSelectDate([...date])
  }

  useEffect(() => {
    console.log('watch')
  }, [selectDate])

  return (
    <>
      <CalendarRange value={selectDate} onChange={change}></CalendarRange>
      <CalendarRange value={selectDate} panel="end" onChange={change}></CalendarRange>
    </>
  )
}
