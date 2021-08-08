/*
 * @Author: last order
 * @Date: 2019-08-18 20:59:06
 * @LastEditTime: 2020-04-08 20:11:04
 */
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Logo from '@/components/logo/logo'
import LoginImg from '~/img/login.png'
import registerImg from '~/img/register.png'
import '@/store/store'

const userStyle = require('./user.scss').default


export default function User () {
  const [state, setstate] = useState('login');

  useEffect(() => {
    console.log(1)
  }, [])

  const login = () => {
    setstate('login')
  }
  const register = () => {
    setstate('register')
  }
  const isLogin = () => {
    return (
      <section className={userStyle.login}>
        <div className={userStyle.left}>
          <img src={state === 'login' ? LoginImg : registerImg} alt=""/>
        </div>
        <div className={userStyle.right}>
          <div className={userStyle.switch}>
            <span 
              className={state === 'login' ? userStyle.active : ''}
              onClick={login}>
                登录
              </span>
            <span 
              className={state === 'register' ? userStyle.active : ''}
              onClick={register}>
                注册
            </span>
          </div>
          {
            state === 'login' ?
              <ul>
                <li>
                  <input type="text" placeholder="账号："/>
                </li>
                <li>
                  <input type="password" placeholder="密码："/>
                </li>
                <li>
                  <button>登录</button>
                </li>
              </ul>
            :
              <ul>
                <li>
                  <input type="text" placeholder="账号："/>
                </li>
                <li>
                  <input type="password" placeholder="密码："/>
                </li>
                <li>
                  <button>注册</button>
                </li>
            </ul>
          }
        </div>
      </section>
    )
  }
  
  return (
    <Router>
      <div className={`${userStyle.user} user`}>
        <div className="logo">
          <Logo theme="light"></Logo>
        </div>
        <div className={userStyle.main}>
          <section className={userStyle.userBox}>
            {
              isLogin()
            }
          </section>
        </div>
      </div>
    </Router>
   
  )
}
