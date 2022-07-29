import { Dayjs } from "dayjs"

export interface ResultDate {
  dayjs: Dayjs
  date: Date
  timestamp: number
}

export type PickerPanel = 'year' | 'month' | 'calendar'