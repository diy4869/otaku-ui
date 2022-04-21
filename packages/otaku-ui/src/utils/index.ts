import { CSSProperties } from "react"

export const styleToStr = (style: CSSProperties): string => {
  const arr = Object.entries(style) as [string, string][]

  return arr.reduce((str, current) => {
    const [key, value] = current

    str += `${key}: ${value};`

    return str
  }, '')
}

export const findDataset = (element: HTMLElement, key: string): HTMLElement | null => {
  if (element === null) return null
  if (element.dataset[key]) return element
  
  return findDataset(element.parentElement as HTMLElement, key)
}

export const timeFormat = (time: number) => {
  const day = time / 1000 / 86400 >> 0
  const hour = time % 86400 / 3600 >> 0
  const minute = time % 86400 % 3600 / 60 >> 0
  const second = time % 86400 % 3600 % 60 >> 0

  return {
    day,
    hour,
    minute,
    second
  }
}