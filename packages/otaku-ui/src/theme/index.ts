import tinycolor from 'tinycolor2'

/**
 * @description https://mp.weixin.qq.com/s/gCxWsIzUf0yGSXDX-AafVw
 */

function palette (color: string, i: number) {
  const { h, s, v } = tinycolor(color).toHsv()

  const getHue = (isLight: boolean, i: number) => {
    const hueStep = 2

    if (h >= 60 && h <= 240) {
      // 冷色调
      // 减淡变亮 色相顺时针旋转 更暖
      // 加深变暗 色相逆时针旋转 更冷
      return isLight ? h - hueStep * i : h + hueStep * i
    } else {
      // 暖色调
      // 减淡变亮 色相逆时针旋转 更暖
      // 加深变暗 色相顺时针旋转 更冷
      return isLight ? h + hueStep * i : h - hueStep * i
    }
  }

  const getSaturation = (isLight: boolean, i: number) => {
    const saturationStep = 15
    const saturationStep2 = 5
    const darkColorCount = 4

    if (isLight) {
      // 减淡变亮 饱和度迅速降低
      return Math.round(s * 100) - saturationStep * i
    } else if (i === darkColorCount) {
      // 加深变暗-最暗 饱和度提高
      return Math.round(s * 100) + saturationStep
    } else {
      // 加深变暗 饱和度缓慢提高
      return Math.round(s * 100) + saturationStep2 * i
    }
  }

  const getValue = (isLight: boolean, i: number) => {
    const brightnessStep1 = 5
    const brightnessStep2 = 15

    if (isLight) {
      // 减淡变亮
      return Math.round(v * 100) + brightnessStep1 * i
    }
    // 加深变暗幅度更大
    return Math.round(v * 100) - brightnessStep2 * i
  }

  // i 为index与6的相对距离
  const isLight = i < 6
  const lightColorCount = 4
  const index = isLight ? lightColorCount + 1 - i : i - lightColorCount - 1

  return tinycolor({
    h: getHue(isLight, index),
    s: getSaturation(isLight, index),
    v: getValue(isLight, index)
  }).toHexString()
}

export default function generator (color: string) {
  return Array.from({ length: 10 }).map((_, index) => {
    // debugger
    return palette(color, index)
  })
}
