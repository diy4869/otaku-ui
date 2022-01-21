import { a } from './type'
import testExportDefault from './type2'

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
  e: (a: number) => void
}

function B ({ c, b, d = 2 }) {
  return (
    <div>B组件</div>
  )
}

export function Test (props: Props) {
  const { a, b = 'middle' } = props

  return (
    <div>hello world</div>
  )
}

export default function C () {}


