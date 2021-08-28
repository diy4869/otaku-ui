const fs = require('fs')
const path = require('path')
const { config } = require('process')

const getSiteConfig = () => {
  const configPath = path.resolve(__dirname, '../site.config.js')

  console.log(configPath)
  try {
    const res = fs.existsSync(configPath)

    if (res) {
      const data = require(configPath)

      return data
    }
  } catch (err) {

  }
}

const siteConfig = getSiteConfig()

let writeData = ''

if (siteConfig) {
  const result = siteConfig.sidebar.map(item => {
    return {
      title: item.title,
      children: item.children.map(children => {
        return {
          title: children.title,
          path: children.path,
          component: `lazy(() => import('@docs${children.path}.md'))`
        }
      })
    }
  })

  writeData = `
import { lazy } from 'react'

export default ${JSON.stringify(result, null, 2)}
`
  console.log(writeData)
}

fs.writeFileSync('src/router/index.ts', writeData.replace())