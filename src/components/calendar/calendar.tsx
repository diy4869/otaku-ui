import React, { useState, useEffect } from 'react'
import CalendarStyle from './calendar.module.scss'

interface Props {
  date?: Date
  change?: (date: string) => void
}

export default function Calendar (props: Props) {
  const [week] = useState(['一', '二', '三', '四', '五', '六', '日'])
  const [date] = useState(props.date ? props.date : new Date())
  const [currentMonth] = useState(date.getMonth())
  const [month] = useState([31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
  const [day] = useState(date.getDate())
  const [selectDate, setSelectDate] = useState(day + '')
  const [arr, setArr] = useState<string[]>([])

  useEffect(() => {
    const firstDay = new Date(date.getFullYear(), currentMonth, 1)
    const dateArr = new Array(7).fill('')

    for (let i = 0; i < month[currentMonth]; i++) {
      dateArr.push(i + 1 + '')
    }
    setArr(dateArr)
  }, [])

  const getDay = (date: string) => {
    // console.log(e)
    if (date) {
      setSelectDate(date)
      if (props.change) props.change(date)
    }
  }

  return (
    <div className={CalendarStyle.calendar}>
      <ul className={CalendarStyle.week}>
        {
          week.map((item, index) => {
            return (
              <li key={index}>{item}</li>
            )
          })
        }
      </ul>
      <ul className={CalendarStyle.month}>
        {
          arr.map((item, index) => {
            return (
              <li 
                key={index} 
                onClick={() => getDay(item)}
                className={selectDate === item ? CalendarStyle.active : ''}>
                {item}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
