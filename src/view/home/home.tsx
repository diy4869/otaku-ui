import React, { useState, useEffect, Fragment } from 'react'

import { useHistory } from 'react-router-dom'
import http from '@/api/api'
import Bangumi from '~/img/miao.png'
import area from '@/config/area'
import level from '@/config/level'
import year from '@/config/year'
import Calendar from '@/components/calendar/calendar'
import Swiper from '@/components/swiper/swiper'
import calendar from '~/img/calendar.png'
import homeStyle from './home.module.scss'
import { Input, Row, Col, Switch, Pagination } from 'antd'


export default function Home () {
  const [week] = useState(['一', '二', '三', '四', '五', '六', '日'])
  const [currentDate] = useState(new Date())
  const [month] = useState(currentDate.getMonth() + 1)
  const [date] = useState(currentDate.getDate())
  const [day] = useState(currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1)
  const [tab] = useState([
    {
      name: '年份',
      data: year,
      id: 0
    },
    {
      name: '分级',
      data: level,
      id: 0
    },
    {
      name: '风格',
      data: [{
        id: 1,
        name: '风格'
      }],
      id: 0
    },
    {
      name: '地区',
      data: area,
      id: 0
    },
    {
      name: '制作公司',
      data: [{
        id: 1,
        name: 'J.C.STAFF'
      }],
      id: 0
    }
  ])
  const [activeTab, setActiveTab] = useState(0)
  const history = useHistory()

  useEffect(() => {
  }, [activeTab])

  let [data, setData] = useState([])
  let [total, setTotal] = useState(0)
  let [currentPage, setCurrentPage] = useState(1)
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(1)
    getData()
  }, [currentPage])

  const getData = (): void => {
    setLoading(true)
    http({
      url: '/bangumi/BangumiList',
      method: 'get',
      params: {
        page: currentPage,
        pageSize: 20
      }
    }).then(res => {
      setLoading(false)
      console.log(res)
      setData(res?.data?.list)
      setCurrentPage(res?.data?.currentPage)
      setTotal(res?.data?.count)
    })
  }

  const setFilterQuery = (id: number): void => {
    // query[renderQueryKey[activeTab]] = id
    // const obj = Object.assign({}, query)
    // setQuery(obj)
  }


  // 番剧筛选
  const filter = (id: number): void => {
    console.log(id)
    setActiveTab(id)
    console.log(activeTab)
  }
  const toDetail = (id: number): void => {
    history.push(`/bangumiDetail?id=${id}`)
  }

  const toPlayer = (id: number): void => {
    history.push(`/player?id=${id}`)
  }

  const onChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const isLoading = () => {
    if (!loading) {
      if (data?.length !== 0) {
        console.log(data)
         return (
          <Fragment>
            <ul className={homeStyle.list}>
                {
                  data?.map((item: any, index) => {
                    return (
                      <li 
                        key={index} 
                        xxl={4} sm={6} xs={8} 
                        className={homeStyle.listItem} 
                        onClick={() => toDetail(item.id)}>
                        <img src={item.cover ?? Bangumi} alt="" />
                        <span>{item.name}</span>
                        <span className={index % 2 !== 0 ? homeStyle.new : ''}>更新至第20集</span>
                      </li>
                    )
                  })
                }
              </ul>
              <section>
              <Pagination 
                current={currentPage} 
                defaultCurrent={1}
                defaultPageSize={20}
                total={total} onChange={onChange} >
              </Pagination>
              </section>
          </Fragment>
         )
      } else {
        return (
          <div className="nullData">暂无数据</div>
        )
      }
    } else {
      return (
        <div className="loading">loading...</div>
      )
    }
  }
  
  const switchChange = (checked: boolean) => {
    console.log(checked)
  }

  const myUpdate = () => {

  }

  const switchTab = () => {
    return (
      <ul className={homeStyle.selectData}>
        {/* <li onClick={() => setFilterQuery(0)} className={query[renderQueryKey[activeTab]] === 0 ? homeStyle.active : ''}>不限</li>
        {
          renderQueryData[renderQueryKey[activeTab]].map((item: any, index: number) => {
            if (renderQueryKey[activeTab] === 'year') {
              return (
                <li 
                  key={index} 
                  onClick={() => setFilterQuery(item.name)} 
                  className={item.name === query[renderQueryKey[activeTab]] ? homeStyle.active : ''}>
                  {item.name}
                </li>
              )
            } else {
              return (
                <li 
                  key={index} 
                  onClick={() => setFilterQuery(item.id)} 
                  className={item.id === query[renderQueryKey[activeTab]] ? homeStyle.active : ''}>
                  {item.name}
                </li>
              )
            }
          })
        } */}
      </ul>
    )
  }

  const viewAll = () => {
    history.push('/timeline')
  }

  return (
    <div className={`${homeStyle.home} home`}>
      <div className={homeStyle.swiperContainer}>
        <Swiper></Swiper>
      </div>
    </div>
  )
}
