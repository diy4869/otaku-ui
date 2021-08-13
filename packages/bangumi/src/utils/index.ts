/*
 * @Author: last order
 * @Date: 2020-02-19 15:08:40
 * @LastEditTime: 2020-04-25 13:35:13
 */
import dayjs from 'dayjs'

type Key = string | number

interface query {
  [propName: string]: any
}

// 时间格式化
export const dateFormat = (time: number | Date, format = "YYYY-MM-DD HH:mm:ss"): string => {
  return dayjs(time).format(format)
}

// 获取get的url参数
export const getQueryString = (url: string = location.search): query => {
  const arr = url.split('?')[url.split('?').length - 1].split('&')

  return arr.reduce((obj: query, current) => {
    const split = current.split('=')
    const [key, val] = split
  
    obj[key] = decodeURIComponent(val)

    return obj
  }, {})
}

// 将base64转换为文件
export const base64ToFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/) as string[]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  
  return new File([u8arr], filename, {type: mime[1]})
}
