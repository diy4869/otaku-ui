import type { First, getArray, join } from './array'
// import type { join }

export type merge<T extends Record<string, unknown>, R extends Record<string, unknown>> = {
  [K in keyof T | keyof R]: K extends keyof T ? K extends keyof R ? [T[K], R[K]] : T[K] : R[K & string]
}

const data = {
  a: 1,
  c: {
    a: 1
  },
  d: [
    1,
    2,
    {
      a: 1
    }
  ]
}


export type Data = typeof data


type ArrayPath<T extends any[], path extends unknown[] = []> = {
  [K in keyof T]: [K, ...path]
}


export type ObjectKeyPath<T, path extends unknown[] = [], R extends Record<string, any> = {}> = T extends Record<string | number, unknown> ? {
  [
    K in keyof T
  ]: {
    PATH: T[K] extends Record<string | number, unknown> ? ObjectKeyPath<T[K], [K, ...path], {}> : T[K] extends any[] ? ArrayPath<T[K], [K, ...path]> : join<[...path, K], '.'>
    // VALUE: T[K]
  }
  // [
  //   K in keyof T as T[K] extends Record<string, unknown> ? ObjectKeyPath<T[K], `${path}.${K & string}`> & string : `${K & string}`
  // ]: T[K]
} : never




type result1 = ObjectKeyPath<Data>
