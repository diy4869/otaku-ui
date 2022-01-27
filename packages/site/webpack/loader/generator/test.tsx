import { a } from './type'
import testExportDefault from './type2'
import React, { useState } from 'react'

type N = number

interface B {
  fn: void
}

interface C {
  fn2: void
}


export interface Props extends B, C {
  /**
   * xxxx
   * @zh-cn 中文
   * @en 英语
  */
 /**
  * a
  * @test 1
  */
  a: N,
  b?: string,
  c: boolean,
  d: any,
  f: a
  size: 'small' | 'middle' | 'large'
  g: React.ReactNode[]
  e: (a: number) => void
}

export const arrowFunction = () => {

}

export function b ({a = 1, b = 3}) {

}

export function Test (props: Props) {
  const { a, b = 'middle' } = props

  const fn = () => {

  }
  
  return (
    <div>hello world</div>
  )
}



