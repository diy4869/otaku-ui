import { generate } from './generate'

function generateColor () {
  Promise.resolve().then(() => {
    const getPrimaryColor = window.getComputedStyle(document.documentElement).getPropertyValue('--otaku-primary-color')

    const result = generate(getPrimaryColor)

    result.forEach((color, colorIndex) => {
      document.documentElement.style.setProperty(`--otaku-primary-color-${colorIndex}`, color)
    })
    console.log(getPrimaryColor)
  })
  
}

generateColor()

export * from './generate'
