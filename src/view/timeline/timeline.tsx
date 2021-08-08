import React, { useState, useEffect, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import calendar from '~/img/calendar.png'
import Bangumi from '~/img/miao.png'
import dayjs from 'dayjs'
import timelineStyle from './timeline.scss'

export default function Timeline () {
  const [week] = useState(['一', '二', '三', '四', '五', '六', '日'])
  const [currentDate, setCurrentDate] = useState(dayjs())
  const computedDate = useState(dayjs())
  const [month] = useState(currentDate.month() + 1)
  const [date] = useState(currentDate.date())
  const [day] = useState(currentDate.day() === 0 ? 6 : currentDate.day() - 1)
  
  const history = useHistory()

  useEffect(() => {
    console.log(currentDate.day())
  }, [currentDate])

  const random = (max: number, min: number, len: number): number[] => {
    let arr: number[] = []
    for (let i = 0; i < len; i++) {
      let num = Math.floor(Math.random() * (max - min)) + min
      arr.push(num)
    }

    return arr
  }

  const toPlayer = (id: number): void => {
    history.push(`/player?id=${id}`)
  }

  function getDay (direction?: string) {
    let start = currentDate

    switch (direction) {
      case 'left':
        start = currentDate.subtract(6, 'day')
        break
      case 'right':
        start = currentDate.add(6, 'day')
        break
      default:
        start = currentDate.subtract(day, 'day')
        break
    }

    console.log('start', start.day())
    // setCurrentDate(start ?? currentDate)

    console.log(start)
    return week.map((item, index) => {
      console.log(item, index)
      const date = dayjs(start).add(index, 'day').date()
  
      return (
        <div key={index} className={timelineStyle.date}>
          <div className={item === week[day] ? timelineStyle.active : ''}>{`${date}日 周${item}`}</div>
          <ul>
            {
              random(8, 1, 1).map(len => {
                return Array(len).fill('').map((j, Jindex) => {
                  return (
                    <li className={timelineStyle.dateItem} key={Jindex} onClick={() => toPlayer(Jindex)}>
                      <img src={Bangumi} alt=""/>
                      <ul>
                        <li>如果历史是一群喵第四季</li>
                        <li>20集</li>
                      </ul>
                    </li>
                  )
                })
              })
            }
          </ul>
        </div>
      )
    })
  }

  return (
    <div className={timelineStyle.timeline}>
      <div className={timelineStyle.main}>
        <div className={timelineStyle.header}>
          <img src={calendar} alt=""/>
          <span>{month}月{date}日 星期{week[day]}</span>
          <div className={timelineStyle.arrow}>
            <span className="icon iconfont b-icon-left1" onClick={() => getDay('left')}></span>
            <span className="icon iconfont b-icon-right1" onClick={() => getDay('right')}></span>
          </div>
        </div>
        <div className={timelineStyle.calendar}>
          {
            getDay()
          }
        </div>
      </div>
    </div>
  )
}