const fs = require('fs')
const { icons } = require('../iconfont/iconfont.json')

function generator () {
  fs.mkdirSync(`./icon`)

  for (current of icons) {
    const code = `
import React from 'react'

export default function ${current.class_name} () {
  return (
    ${current.svg.replace(/(class=)/, 'className=')}
  )
}`.trim()

    fs.writeFileSync(`./icon/${current.class_name}.tsx`, code)
  } 
}



generator()