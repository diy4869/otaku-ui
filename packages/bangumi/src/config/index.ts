/*
 * @Author: last order
 * @Date: 2020-02-22 16:58:55
 * @LastEditTime: 2020-03-14 22:46:27
 */
const DEV_URL = 'http://localhost:3000/api'
const PROD_URL = 'http://api.bangumi.xyz/api'

export const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL
