
export const styleToStr = (style: Record<string, string | number>): string => {
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

export const timeFormat = (time: number, fillZero = true) => {
  const t = time / 1000
  const day = t / 86400 >> 0
  const hour = t % 86400 / 3600 >> 0
  const minute = t % 86400 % 3600 / 60 >> 0
  const second = t % 86400 % 3600 % 60 >> 0

  return {
    day,
    hour: fillZero ? `${hour}`.padStart(2, '0') : hour,
    minute: fillZero ? `${minute}`.padStart(2, '0') : minute,
    second: fillZero ? `${second}`.padStart(2, '0') : second,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flattern = <T extends any[] = Record<string, any>[]>(arr: T, key = 'children'): Record<string, any>[] => {
  return arr.reduce((total, current) => {
    const isArray = Array.isArray(current[key])
    total.push(current)

    if (isArray) {
      total.push(...flattern(current[key], key))
    }

    return total
  }, [])
}

export const getWeek = (firstWeek: '一' | '日') => {
  const week = ['一', '二', '三', '四', '五', '六']
  
  return firstWeek === '一' ? [...week, '日'] : ['日', ...week]
}

export * from './notice'

export const getCSSVar = (str = '--otaku-primary-color', el = document.documentElement,) => {
  return window.getComputedStyle(el).getPropertyValue(str)
}