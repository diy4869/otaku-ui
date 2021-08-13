import { useState } from 'react'
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'

dayjs.extend(isLeapYear)

export function useCalendar(date?: dayjs.ConfigType) {
  const d = dayjs(date)
  const [month] = useState([31, d.isLeapYear() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
  const currentYear = d.year()
  const currentMonth = d.month()
  const prev = []
  const current = []
  const next = []
  const firstDay = dayjs(`${currentYear}-${month[currentMonth]}-1`).day()
  const prevMonthStart = month[currentMonth] - firstDay
  const nextMonthLen = 42 - month[currentMonth] - firstDay

  for (let i = prevMonthStart; i <= month[currentMonth]; i++) {
    prev.push(i)
  }

  for (let i = 1; i <= month[currentMonth]; i++) {
    current.push(i)
  }

  for (let i = 1; i < nextMonthLen; i++) {
    next.push(i)
  }

  return {
    prev,
    current,
    next
  }
}
