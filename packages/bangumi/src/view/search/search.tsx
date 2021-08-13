import React, { Fragment, useEffect, useState } from 'react'
import { Pagination, Switch, Row, Col } from 'antd'
import { useLocation, useHistory } from 'react-router-dom'
import { getQueryString } from '@/utils/index'
import http from '@/api/api'
import nullData from '~/img/nullData.png'
import Bangumi from '~/img/miao.png'
const searchStyle = require('./search.scss').default

interface Comany {
  id: number,
  name: string
}

interface BangumiInterface {
  id: number
  name: string
  originalName?: string
  cover?: string
  addTime: number,
  currentStatus: string,
  companyId: number,
  company?: Comany[]
}

export default function SearchComponent (props: any) {
  const location = useLocation()
  const history = useHistory()
  const query = getQueryString(location.search)

  let [data, setData] = useState<any[]>([])
  let [total, setTotal] = useState(0)
  let [currentPage, setCurrentPage] = useState(1)
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    getData()
  }, [currentPage, query.search])

  const getData = (): void => {
    setLoading(true)
    http({
      url: '/bangumi/BangumiList',
      method: 'get',
      params: {
        page: currentPage,
        pageSize: 15,
        keyword: query.search as string
      }
    }).then(res => {
      setLoading(false)
      console.log(res)
      setData(res.data.list)
      setCurrentPage(res.data.currentPage)
      setTotal(res.data.count)
    })
  }


  // const onSearch = (val: string) => {
  //   history.push(`/search?search=${val}`)
  // }
  const onChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    console.log(currentPage)
    getData()
  }

  const switchChange = (checked: boolean) => {
    console.log(checked)
  }

  const toDetail = (id: number): void => {
    history.push(`/bangumiDetail?id=${id}`)
  }

  const isLoading = () => {
    if (!loading) {
      if (data.length != 0) {
         return (
          <div className={searchStyle.search}>
            <div className={searchStyle.main}>
              <div className={searchStyle.filter}>
                <div className={searchStyle.left}>
                  {/* <h1>分级检索</h1> */}
                  <ul>
                    <li className={searchStyle.active}>全部</li>
                    <li>G</li>
                    <li>PG13</li>
                    <li>R15+</li>
                    <li>R18+</li>
                  </ul>
                </div>
                <div className={searchStyle.right}>
                  <span>查看已完结</span>
                  <Switch defaultChecked onChange={switchChange} />
                </div>
              </div>
              <Row className={searchStyle.list} gutter={[16, 20]}>
                {
                  data.map((item: BangumiInterface, index) => {
                    return (
                      <Col key={index} xxl={3} sm={4} xs={4} className={searchStyle.listItem}>
                        <img src={Bangumi} alt="" onClick={() => toDetail(item.id)}/>
                        <span>{ item.name }</span>
                        <span className={index % 2 !== 0 ? searchStyle.new : ''}>{item.currentStatus}</span>
                      </Col>
                    )
                  })
                }
              </Row>
              <div className={searchStyle.pagination}>
                <Pagination 
                  current={currentPage} 
                  defaultCurrent={1}
                  defaultPageSize={20}
                  total={total} onChange={onChange} />
              </div>
            </div>
            
          </div>
         )
      } else {
        return (
          <div className={searchStyle.nullData}>
            <img src={nullData} alt=""/>
            <span>没有找到相关结果</span>
          </div>
        )
      }
    } else {
      return (
        <div className={searchStyle.loading}>loading...</div>
      )
    }
  }
  return (
    <Fragment>
      {
        isLoading()
      } 
    </Fragment>
  )
}
