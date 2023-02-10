const path = require('path')

const { generatorAPI } = require('./index')
const libPath = path.resolve(__dirname, '../../otaku-ui')
const entryPath = path.resolve(libPath, './src/index.ts')

// generatorAPI(entryPath)
const form = path.resolve(libPath, './src/lib/tooltip/tooltip.tsx')
generatorAPI(form)