const path = require('path')
const fs = require('fs')
const ts = require('typescript')
const libPath = path.resolve(__dirname, '../../../../otaku-ui')
const entryPath = path.resolve(libPath, './src/index.ts')
const { generator } = require('./core')
const { parser, readFile } = require('../utils')
const tsconfig = require('../../../../otaku-ui/tsconfig.json')
const program = ts.createProgram([entryPath], tsconfig)
const entryContent = readFile(entryPath)

const parserPath = path.resolve(libPath, './src/lib/button/button.tsx')
const result = generator(entryPath, {})



module.exports.generatorAPI = result




