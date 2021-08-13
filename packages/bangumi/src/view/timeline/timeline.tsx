import React, { useState, useEffect, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { Timeline, TimelineItem, Switch, Pagination, CheckBox, Calendar } from 'bangumi-ui'
import calendar from '~/img/calendar.png'
import Bangumi from '~/img/miao.png'
import dayjs from 'dayjs'
import timelineStyle from './timeline.module.scss'

export default () => {
  const [week] = useState(['一', '二', '三', '四', '五', '六', '日'])
  const [currentDate, setCurrentDate] = useState(dayjs())
  const computedDate = useState(dayjs())
  const [month] = useState(currentDate.month() + 1)
  const [date] = useState(currentDate.date())
  const [day] = useState(currentDate.day() === 0 ? 6 : currentDate.day() - 1)
  
  const history = useHistory()

  useEffect(() => {
    console.log(currentDate.day(), random(8, 1, 13))
  }, [currentDate])


  const random = (max: number, min: number, len: number): number => {
    let num = 0
    for (let i = 0; i < len; i++) {
      num = Math.floor(Math.random() * (max - min)) + min
    }

    return num
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
    
    return new Array(5).fill('').map((item, index) => {
      console.log(item, index)
      const date = dayjs(start).add(index, 'day').date()
  
      return (
        <>
        <Timeline>
          <TimelineItem 
            className={timelineStyle.bangumiList}
            title="asdfasdf"
            key={index}>
          {
            new Array(random(10, 3, 1)).fill('').map((j, Jindex) => {
              return (
                  <div className={timelineStyle.dateItem} key={`${index}-${Jindex}`} onClick={() => toPlayer(Jindex)}>
                    <img className={timelineStyle.cover} src={Bangumi} alt=""/>
                    <ul className={timelineStyle.title}>
                      <li>如果历史是一群喵第四季</li>
                      <li>20集</li>
                    </ul>
                  </div>
                )
              })
            }
            </TimelineItem>
          </Timeline>
        </>
      )
    })
  }

  return (
    <div className={timelineStyle.timeline}>
       
        {/* <div className={timelineStyle.header}>
          <img src={calendar} alt=""/>
          <span>{month}月{date}日 星期{week[day]}</span>
          <div className={timelineStyle.arrow}>
            <span className="icon iconfont b-icon-left1" onClick={() => getDay('left')}></span>
            <span className="icon iconfont b-icon-right1" onClick={() => getDay('right')}></span>
          </div>
          <Switch></Switch>
        </div> */}

        <Pagination></Pagination>
        <CheckBox></CheckBox>
        <Calendar></Calendar>
        <div className={timelineStyle.calendar}>          
          <div className={timelineStyle.right}>
            {
              getDay()
            }
          </div>
        </div>
    </div>
  )
}