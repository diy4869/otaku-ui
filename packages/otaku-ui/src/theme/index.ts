import { generate } from './generate'

function generateColor () {
  Promise.resolve().then(() => {
    const getPrimaryColor = window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color')
    // const getPrimaryColor = '#0A8DFF'


    const result = generate(getPrimaryColor)

    result.forEach((color, colorIndex) => {
      document.documentElement.style.setProperty(`--otaku-primary-color-${colorIndex}`, color)
    })
    console.log(getPrimaryColor)
  })
  
}

generateColor()
