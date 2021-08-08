import React, { useState, useEffect } from 'react'
import { Switch, Row, Col, Pagination } from 'antd'
import { useHistory } from 'react-router-dom'
import userBackgroud from '~/img/userBackground.png'
import userIcon from '~/img/userIcon.png'
import Bangumi from '~/img/miao.png'
import UploadImage from '@/components/upload/upload'
import area from '@/config/area'
import level from '@/config/level'
import year from '@/config/year'
import http from '@/api/api'
// import Menu from '@/components/menu/menu'
// const userInfoStyle = require('./userInfo.scss').default

interface filterQuery {
  year: number,
  level: number,
  style: number,
  area: number,
  company: number
}

export default function UserInfo () {
  const [query, setQuery] = useState<filterQuery>({
    year: 0,
    level: 0,
    style: 0,
    area: 0,
    company: 0
  })
  const [filter, setFilter] = useState([
    {
      id: 'level',
      name: '分级',
      data: level,
      collapse: false
    },
    {
      id: 'area',
      name: '地区',
      data: area,
      collapse: false
    },
    {
      id: 'year',
      name: '年份',
      data: year,
      collapse: false
    },
    {
      id: 'company',
      name: '制作公司',
      data: [],
      collapse: false
    },
    {
      id: 'style',
      name: '风格',
      data: [],
      collapse: false
    }
  ])
  let [data, setData] = useState<Array<number>>([1])
  let [total, setTotal] = useState(0)
  let [currentPage, setCurrentPage] = useState(1)

  const history = useHistory()
  useEffect(() => {
    RequestAll()
    getCollectionList()
  }, [])

  const RequestAll = () => {
    Promise.all([getAllCompany(), getStyle()]).then((res: any) => {
      console.log(res)
      filter[3]['data'] = res[0]['data']['list']
      filter[4]['data'] = res[1]['data']
      setFilter([...filter])
      console.log(filter)
    })
  }

  // 获取制作公司
  const getAllCompany = () => {
    return new Promise((resolve) => {
      http({
        url: '/company/getAllCompany',
        method: 'get'
      }).then(res => {
        console.log(res)
        resolve(res)
        
      })
    })
  }

  // 用户收藏的番剧
  const getCollectionList = () => {
    http({
      url: '/user/collectionList',
      method: 'get',
      params: {
        uid: 1
      }
    }).then(res => {
      console.log(res)
      setData(res?.data.list)
      setCurrentPage(res.data.currentPage)
      setTotal(res?.data?.count)
    })
  }

  // 获取风格
  const getStyle = () => {
    return new Promise((resolve) => {
      http({
        url: '/bangumi/getTag',
        method: 'get'
      }).then(res => {
        resolve(res)
      })
    })
  }
  function prop <T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key]
  }

  const myUpdate = () => {

  }

  const toDetail = (id: number): void => {
    history.push(`/bangumiDetail?id=${id}`)
  }

  const search = (index: number, item?: any) => {
    const key = filter[index]['id']

    let data = prop(query, key as any)
    
    data = item === 0 ? 0 : key === 'year' ? item.name : item.id
    const obj = Object.assign({}, data)

    setQuery(obj)
  }
  
  // 分类折叠
  const collapse = (index: number) => {
    filter[index].collapse = !filter[index].collapse

    setFilter([...filter])
  }

  const onChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // 右边筛选条件
  const list = (item: any, index: number) => {
    const key = filter[index]['id']
    return (
      item.data.map((dataItem: any, dataIndex: number) => {
        if (key === 'year') {
          return (
            <li 
              key={dataIndex}
              onClick={() => search(index, dataItem)}
              className={dataItem.name === query[key] ? userInfoStyle.active : ''}>
              {dataItem.name}
            </li>
          )
        } else {
          return (
            <li 
              key={dataIndex}
              onClick={() => search(index, dataItem)}
              className={dataItem.id === prop(query, key as any) ? userInfoStyle.active : ''}>
              {dataItem.name}
            </li>
          )
        }
      })
    )
  }
  return (
    <div className={`${userInfoStyle.userInfo} userInfo`}>
      {/* <Menu></Menu> */}
      <Row className={userInfoStyle.main} gutter={60}>
        <Col span={16} className={userInfoStyle.left}>
          {/* 用户信息 */}
          <UploadImage></UploadImage>
          <div className={userInfoStyle.user}>
            <img src={userBackgroud} alt=""/>
            <div className={userInfoStyle.userDetail}>
              <div className={userInfoStyle.icon}>
                <img className={userInfoStyle.userIcon} src={userIcon} alt=""/>
                <span>uid: 1</span>
              </div>
              <div className={userInfoStyle.spaceBetween}>
                <div className={userInfoStyle.username}>
                  <span>last order</span>
                  <span>肥宅</span>
                </div>
                <div>
                  <span className="icon iconfont b-icon-edit"></span>
                  <div className={userInfoStyle.button}>
                    <button>修改资料</button>
                    <button>修改密码</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={userInfoStyle.myCollection}>
            <div className={userInfoStyle.spaceBetween}>
              <div>
                <span>我的追番</span>
                <span>3</span>
              </div>
              <div>
                <span>已追番：</span>
                <span>{total}</span>
              </div>
            </div>
            {/* 列表展示 */}
            <Row className={userInfoStyle.list} gutter={[16, 20]}>
                {
                  data.map((item: any, index) => {
                    return (
                      <Col key={index} xxl={4} sm={6}  xs={8} className={userInfoStyle.listItem}>
                        <img src={Bangumi} alt="" onClick={() => toDetail(item.id)}/>
                        <span>{item.name}</span>
                        <span className={index % 2 !== 0 ? userInfoStyle.new : ''}>{item.currentStatus}</span>
                      </Col>
                    )
                  })
                }
              </Row>
              <section className="pagination">
                <Pagination 
                  current={currentPage} 
                  defaultCurrent={1}
                  defaultPageSize={20}
                  total={total} onChange={onChange} />
              </section>
          </div>
        </Col>
        <Col span={8} className={userInfoStyle.right}>
          <ul className={userInfoStyle.spaceBetween}>
            <li>
              分类检索
            </li>
            <li>
              <span>查看已完结</span>
              <span>
                <Switch defaultChecked onChange={myUpdate} />
              </span>
            </li>
          </ul>
          <div className={userInfoStyle.filter}>
            {
              filter.map((item, index) => {
                return (
                  <div className={userInfoStyle.filterItem} key={index}>
                    <div className={userInfoStyle.spaceBetween}>
                      <span>{item.name}</span>
                      <div className={userInfoStyle.collapse} onClick={() => collapse(index)}>
                        <span className={`icon iconfont b-icon-right1 ${item.collapse ? userInfoStyle.tabActiveRotate : ''}`}></span>
                        <span>{item.collapse ? '展开' : '收起'}</span>
                      </div>
                    </div>
                    
                    <ul style={{
                      transform: `scaleY(${item.collapse ? 0 : 1})`,
                      display: item.collapse ? 'none' : 'flex'
                    }}>
                      {/* <li 
                        onClick={() => search(index, 0)}
                        className={query[filter[index]['id']] === 0 ? userInfoStyle.active : ''}>
                        全部
                      </li> */}
                      {
                        list(item, index)
                      }
                    </ul>
                  </div>
                )
              })
            }
          </div>
        </Col>
        {/* 修改资料 */}
        {/* <Modal
          title="修改个人资料"
          centered
          visible={true}
          maskClosable={false}
          width="900px"
        >
          <Row gutter={20}>
            <Col span={16}>
            </Col>
          </Row>
        </Modal> */}
      </Row>
    </div>
  )
}