import dayjs from 'dayjs'
import { useMemo } from 'react'

export function useToday (date: dayjs.ConfigType) {
  return useMemo(() => {
    const today = dayjs().format('YYYY-M-DD')
    const dateFormat = dayjs(date).format('YYYY-M-DD')

    console.log(today, dateFormat, today === dateFormat)
    return today === dateFormat
  }, [date])

}