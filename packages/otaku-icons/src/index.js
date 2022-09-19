const fs = require('fs')
const path = require('path')
const { icons } = require('../iconfont/iconfont.json')

function generator () {
  const iconDir = path.resolve(__dirname, './lib/icon')

  fs.mkdirSync(iconDir)

  for (current of icons) {
    const code = `
import React from 'react'

export function ${current.class_name} () {
  return (
    ${current.svg.replace(/(class=)/, 'className=')}
  )
}`.trim()

    const filePath = path.resolve(__dirname, `./lib/icon/${current.class_name}.tsx`)
    fs.writeFileSync(filePath, code)
  }

  const entry = path.resolve(__dirname, `./lib/index.ts`)
  fs.writeFileSync(entry, icons.map(item => {
    return `export * from './icon/${item.class_name}'`
  }).join('\n'))
  
}



generator()