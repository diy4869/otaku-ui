import React, { useState, useEffect, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { InputNumber, Timeline, TimelineItem, Switch, Pagination, DateTimePicker } from 'bangumi-ui'
import calendar from '~/img/calendar.png'
import Bangumi from '~/img/miao.png'
import dayjs from 'dayjs'
import timelineStyle from './timeline.module.scss'

export default () => {
  const [currentDate, setCurrentDate] = useState(dayjs())
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
      return (
        <>
        <Timeline key={index}>
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
      <div>=====group======</div>
      <InputNumber></InputNumber>
      {/* <Pagination></Pagination> */}
      

        <div style={{margin: '50px 0'}}></div>
        <DateTimePicker></DateTimePicker>
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