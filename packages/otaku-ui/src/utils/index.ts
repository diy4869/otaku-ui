import { CSSProperties } from "react"

export const styleToStr = (style: CSSProperties): string => {
  const arr = Object.entries(style) as [string, string][]

  return arr.reduce((str, current) => {
    const [key, value] = current

    str += `${key}: ${value};`

    return str
  }, '')
}
