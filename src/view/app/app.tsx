/*
 * @Author: last order
 * @Date: 2019-08-18 20:59:06
 * @LastEditTime: 2020-05-01 09:58:31
 */
// import { hot } from 'react-hot-loader/root'
import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import Logo from '../../components/logo/logo'
import { SearchButton } from '../../lib/input/input'
import Button from '../../lib/button/button'
import routes from '../../router/router'
import { getQueryString } from '../../utils/index'
import userIcon from '~/img/userIcon.png'
import http from '../../api/api'
import appStyle from './app.module.scss'

import '@/store/store'
// const { Footer } = Layout

function App () {
  const query = getQueryString(location.search)
  const [keyword, setKeyword] = useState(query?.search)
  
  console.log(useHistory)
  useEffect(() => {
    console.log(1)
    login()
  }, [])

  const toUserInfo = () => {
    // history.push('/userInfo')
    location.href = `${location.origin}/userInfo`
  }

  const search = (val: string) => {
    // if (val === '') return
    // setKeyword(val)
    location.href = `/search?search=${val}`
    // history.push(`/search?search=${val}`)
  }
  const login = () => {
    http({
      url: '/user/login',
      method: 'post',
      data: {
        id: 1,
        password: '123456'
      }
    }).then((res: { data: { token: string } }) => {
      console.log(res)
      localStorage.setItem('token', res?.data?.token)
    })
  }

  return (
    <div id={appStyle.app}>
       <Suspense fallback={<div></div>}>
        <Router>
          <header>
            <div className={appStyle.title}>bangumi</div> 
            <div className={appStyle.main}>
              <ul className={appStyle.headerList}>
                {
                  [
                    {
                      name: '首页',
                      router: '/'
                    },
                    {
                      name: '索引',
                      router: ''
                    },
                    {
                      name: '时间表',
                      router: '/timeline'
                    },
                    {
                      name: '播放页',
                      router: '/player?id=1'
                    }
                  ].map((item, index) => {
                    return (
                      <li className={appStyle.listItem} key={index}>
                        <Button 
                          type="text" 
                          onClick={() => {
                            location.href = item.router
                          }}>
                          {item.name}
                        </Button>
                      </li>
                    )
                  })
                }
              </ul>
              <div className={appStyle.search}>
                <SearchButton 
                    inputProps={{
                      clear: true,
                      placeholder: "鬼灭之刃",
                      // border: false,
                      size:"small",
                      // bgcolor:"#f9f9f9",
                      // type: 'password',
                      // showPassword: true
                    }}
                    buttonProps={{
                      type: 'primary'
                    }}
                >搜索</SearchButton>
              </div>
              <div className={appStyle.userBtn}>
                <Button type="text">登录</Button>
                <Button size="mini">注册</Button>
              </div>
            </div>
          </header>
          <div id={appStyle.main}>
            <div className={appStyle.center}>
              <Switch>
                {
                  routes.map((router) => {
                    return (
                      <Route
                        exact
                        path={router.path}
                        component={router.component}
                        key={router.path}
                      />
                    )
                  })
                }
              </Switch>
            </div>
          </div>
          
        </Router>
        {/* <Footer className={appStyle.footer}>Footer</Footer> */}
      </Suspense>
    </div>
  )
}

export default App