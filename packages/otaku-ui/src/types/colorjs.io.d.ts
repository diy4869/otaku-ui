declare module 'colorjs.io' {
  interface mixOptions {
    space: string
    outputSpace: string
  }

  type colorSpace = 'srgb' | 'lch' | 'p3' | 'display-p3'

  export default class Color {
    constructor (color: string)
    constructor (options: {
      spaceId: string,
      coords: number[],
      alpha: number
    })

    mix (color1: Color | string, percentage?: number, options?: mixOptions): Color
  }
}