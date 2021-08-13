/*
 * @Author: last order
 * @Date: 2020-02-22 16:57:33
 * @LastEditTime: 2020-03-14 22:44:38
 */
import axios from 'axios'
import httpStatus from '@/api/httpStatus'
import { BASE_URL } from '@/config/index'
import { message } from 'antd'

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  // withCredentials: true
})

// interface httpResponse {
//   status: number,
//   mesage: string,
//   data?: [] | object
// }

// 添加请求拦截器
http.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('token')

  if (token) {
    config.headers = {
      ...config.headers,
      token
    }
  }

  return config
}, (err: any) => {
  console.log(err)
  // 对请求错误做些什么
  // Promise.reject(err)
})

http.interceptors.response.use(res => {
  // 对响应数据做点什么
  // console.log(res)
  if (res.status === 200 && res.data.code === 1) {

    // console.log(res)
    return res.data
  } else {
    return message.info(res.data.message)
  }
}, err => {
  if (err.response) {
    const status = httpStatus.find(item => item.code === err.response.status)
    return message.error(status?.message)
  } else {
    return message.error('服务器异常')
  }
})

export default http
