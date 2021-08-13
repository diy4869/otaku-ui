import React, { useState, useEffect } from 'react'
import http from '@/api/api'
import { useLocation, useHistory } from 'react-router-dom'
import { getQueryString } from '@/utils/index'
import Bangumi from '~/img/miao.png'
import { Row, Col } from 'antd'
import bangumiDetailStyle from './bangumiDetail.scss'

interface episodeInterface {
  id: number,
  episode: number,
  title?: string
}

const episode = [
  {
    id: 1,
    episode: 1,
    title: '第一集'
  },
  {
    id: 2,
    episode: 2,
    title: '第二集'
  },
  {
    id: 3,
    episode: 3,
    title: '第三集'
  },
  {
    id: 4,
    episode: 4,
    title: '第四集'
  },
  {
    id: 5,
    episode: 5,
    title: '第五集'
  },
  {
    id: 6,
    episode: 6,
    title: '第六集'
  }
]

export default function BangumiDetail () {
  const location = useLocation()
  const history = useHistory()
  const query = getQueryString(location.search)
  const [quarter] = useState([
    {
      id: 1,
      name: '第一季'
    },
    {
      id: 2,
      name: '第二季'
    },{
      id: 3,
      name: '第三季'
    }
  ])
  const [currentQuarter, setCurrentQuarter] = useState(1)
  const [currentEpisode, setCurrentEpisode] = useState(1)
  let [data, setData] = useState<any>({})
  // let [loading, setLoading] = useState(false)
  let [id] = useState(query.id as number)
  let [collection, setCollection] = useState(false)
  const [Episode] = useState<episodeInterface[]>(episode)
  useEffect(() => {
    getData()
  }, [id])

  const getData = (): void => {
    // setLoading(true)
    http({
      url: '/bangumi/getBangumiDetail',
      method: 'get',
      params: {
        id: id,
      }
    }).then(res => {
      // setLoading(false)
      console.log(res)
      setData(res.data)
    })
  }

  const CollectionBangumi = () => {
    collection = !collection
    setCollection(collection)
  }
  const toPlayer = (id: number) => {
    setCurrentEpisode(id)
    history.push('/player')
  }

  const toDetail = (id: number): void => {
    history.push(`/bangumiDetail?id=${id}`)
  }

  const switchEpisode = (id: number) => {
    setCurrentQuarter(id)
  }

  return (
    <div className={bangumiDetailStyle.bangumiDetail}>
      <Row className={bangumiDetailStyle.main} gutter={60}>
        <Col span={18} className={bangumiDetailStyle.left}>
          {/* 番剧详情 */}
          <Row className={`${bangumiDetailStyle.detail} detail`}>
            <img src={data.cover} alt="" className={bangumiDetailStyle.bangumi}/>
            <Col>
              <ul>
                <li className={bangumiDetailStyle.title}>{data.name}</li>
                <li>
                  <div className={bangumiDetailStyle.update}>
                    <span>更新至第20集</span>
                    <span 
                      onClick={CollectionBangumi}
                      className={`icon iconfont ${collection ? 'b-icon-heart' : 'b-icon-heart-fill'} ${bangumiDetailStyle.collection}`}>
                    </span>
                  </div>
                </li>
                <li>
                  <span>原名：</span>
                  <span>{data.originalName}</span>
                </li>
                <li>
                  <span>标签：</span>
                  <div className={bangumiDetailStyle.tag}>
                    {
                      data?.tags?.map((item: any) => {
                        return <span key={item.id}>{item.name}</span>
                      })
                    }
                  </div>
                </li>
                <li>
                  <span>评级：</span>
                  <span>PG13 13岁以下需陪同</span>
                </li>
                <li>
                  <span>开播：</span>
                  <span>2018年9月2日</span>
                </li>
                
                <li>
                  <span>更新状态：</span>
                  <span>暂无</span>
                </li>
                <li>
                  <span>制作公司：</span>
                  {/* <span>{data?.company?.name}</span> */}
                </li>
                <li>
                  <h3>简介：</h3>
                  <span className={bangumiDetailStyle.desc}>{data.description}</span>
                </li>
              </ul>
            </Col>
          </Row>
          {/* 季度 */}
          <section>
            <div className={bangumiDetailStyle.quarter}>
              {
                quarter.map((item, index) => {
                  return (
                    <span 
                      key={index}
                      onClick={() => switchEpisode(index + 1)}
                      className={index + 1 === currentQuarter ? bangumiDetailStyle.active : ''}>
                      {item.name}
                    </span>
                  )
                })
              }
              
            </div>
            <ul className={bangumiDetailStyle.episode}>
              {
                Episode.map((item, index) => {
                  return (
                    <li 
                      key={index} 
                      onClick={() => toPlayer(index + 1)}
                      className={index + 1 === currentEpisode ? bangumiDetailStyle.episodeActive : ''}>
                        <span>{item.episode}</span>
                        <span>{item?.title}</span>
                    </li>
                  )
                })
              }
            </ul>
          </section>
          {/* 相关推荐 */}
          <section className={bangumiDetailStyle.recommend}>
            <h2>相关推荐</h2>
            {/* 列表展示 */}
            <Row className={bangumiDetailStyle.list} gutter={[16, 20]}>
                {
                  Array(8).fill('').map((item, index) => {
                    return (
                      <Col key={index} xxl={4} sm={6} xs={8} className={bangumiDetailStyle.listItem}>
                        <img src={Bangumi} alt="" onClick={() => toDetail(index)}/>
                        <span>如果历史是一群喵</span>
                        <span className={index % 2 !== 0 ? bangumiDetailStyle.new : ''}>更新至第20集</span>
                      </Col>
                    )
                  })
                }
              </Row>
          </section>
        </Col>
        <Col span={6} className={bangumiDetailStyle.right}>
          <section className={bangumiDetailStyle.soundQuality}>
            <h2>角色声优</h2>
            <ul>
              <li>狐三少</li>
              <li>山新</li>
              <li>狐三少</li>
              <li>山新</li>
              <li>狐三少</li>
              <li>山新</li>
              <li>狐三少</li>
              <li>山新</li>
              <li>狐三少</li>
              <li>山新</li>
              <li>狐三少</li>
              <li>山新</li>
            </ul>
          </section>
          <section className={bangumiDetailStyle.staff}>
            <h2>STAFF</h2>
            <ul>
              <li>狐三少</li>
              <li>山新</li>
              <li>狐三少</li>
              <li>山新</li>
              <li>狐三少</li>
              <li>山新</li>
              <li>狐三少</li>
              <li>山新</li>
              <li>狐三少</li>
              <li>山新</li>
              <li>狐三少</li>
              <li>山新</li>
            </ul>
          </section>
        </Col>
      </Row>
    </div>
  )
}
