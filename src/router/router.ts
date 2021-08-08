/*
 * @Author: last order
 * @Date: 2020-02-26 22:21:24
 * @LastEditTime: 2020-04-04 16:03:42
 */
import { lazy } from 'react'
import Home from '@/view/home/home'

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/player',
    component: lazy(() => import('@/view/player/player'))
  },
  {
    path: '/timeline',
    component: lazy(() => import('@/view/timeline/timeline'))
  },
  {
    path: '/userInfo',
    component: lazy(() => import('@/view/userInfo/userInfo'))
  },
  {
    path: '/bangumiDetail',
    component: lazy(() => import('@/view/bangumiDetail/bangumiDetail'))
  },
  {
    path: '/search',
    component: lazy(() => import('@/view/search/search'))
  }
]
