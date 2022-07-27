import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'

dayjs.extend(isLeapYear)

export function useCalendar (
  date?: dayjs.ConfigType,
  firstWeek = '日',
  format = 'YYYY-MM-DD'
) {
  const d = dayjs(date)
  const month = [
    31,
    d.isLeapYear() ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ]

  const prev = []
  const current = []
  const next = []
  const currentMonth = d.month()
  const firstDay = `${d.year()}-${currentMonth + 1}-1`
  const weekDay = dayjs(firstDay).day() === 0 ? 7 : dayjs(firstDay).day()
  const prevMonth = dayjs(firstDay).subtract(weekDay, 'day')
  const prevMonthStart =
    firstWeek === '一' ? prevMonth.date() + 1 : prevMonth.date()
  const prevMonthEnd = month[prevMonth.month()]
  const nextMonthEnd =
    42 - month[currentMonth] - (prevMonthEnd - prevMonthStart) - 1

  for (let i = prevMonthStart; i <= prevMonthEnd; i++) {
    prev.push(`${dayjs(firstDay).year()}-${prevMonth.month() + 1}-${i}`)
  }

  for (let i = 1; i <= month[currentMonth]; i++) {
    current.push(`${d.year()}-${currentMonth + 1}-${i}`)
  }

  for (let i = 1; i <= nextMonthEnd; i++) {
    const nextMonth = dayjs().add(1, 'month')

    next.push(`${nextMonth.year()}-${nextMonth.month() + 1}-${i}`)
  }

  return {
    prev: prev.map(item => dayjs(item).format(format)),
    current: current.map(item => dayjs(item).format(format)),
    next: next.map(item => dayjs(item).format(format))
  }
}
