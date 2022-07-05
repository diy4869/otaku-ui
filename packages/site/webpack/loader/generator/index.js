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


const result = transform(entryPath, {})



module.exports.generatorAPT = result




