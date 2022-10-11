const fs = require('fs')
const path = require('path')
const { execSync, exec } = require('child_process')
const { icons } = require('../iconfont/iconfont.json')
const transform = require('@balajmarius/svg2jsx')

async function generator () {
  console.log(path.resolve(__dirname, './lib/icon'))
  // return
  const iconDir = path.resolve(__dirname, './lib/icon')
  execSync(`rm -rf ${iconDir}`)
  fs.mkdirSync(iconDir)

  for await (current of icons) {
    const code = await transform(current.svg)

      const filePath = path.resolve(__dirname, `./lib/icon/${current.class_name}.tsx`)
      fs.writeFileSync(
        filePath, 
        code
          .replaceAll(';', '')
          .replace('export default Icon', '')
          .replace('function Icon', `export function ${current.class_name} `)
          .trim()
      )

    // console.log(result)
  }
    const entry = path.resolve(__dirname, `./lib/index.ts`)
  fs.writeFileSync(entry, icons.map(item => {
    return `export * from './icon/${item.class_name}'`
  }).join('\n'))

//   for (current of icons) {
//     const code = `
// import React from 'react'

// export function ${current.class_name} () {
//   return (
//     ${current.svg.replace(/(class=)/, 'className=')}
//   )
// }`.trim()

//     const filePath = path.resolve(__dirname, `./lib/icon/${current.class_name}.tsx`)
//     fs.writeFileSync(filePath, code)
//   }


  
}



generator()