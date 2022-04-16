import type { merge } from './object'

export type split<T extends string, str extends string, result extends unknown[] = []> =
  T extends `${infer First}${str}${infer Rest}` ? split<Rest, str, [...result, First]> :
  T extends '' ? result :
  T extends `${infer First}` ? [...result, First] : never


type parserQuery<T extends string, R extends Record<string, unknown> = {}> =
  T extends `${infer Key}=${infer Value}&${infer Rest}` ? parserQuery<Rest, merge<R, {
    [K in Key]: Value
  }>> : T extends `${infer Key}=${infer Value}` ? merge<R, {
    [K in Key]: Value
  }> : R


export type querystring<T extends string> = T extends `?${infer Rest}` ? parserQuery<Rest> : never




type a = querystring<'?a=1&b=2&a=3'>