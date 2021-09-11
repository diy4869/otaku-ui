const fs = require('fs')
const path = require('path')
const fsPromise = fs.promises

const checkDirectory = (path) => {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false)
      } else {
        const res = stats.isDirectory()
        res ? resolve(true) : resolve(false)
      }
    })
  })
}

const checkFile = path => {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false)
      } else {
        const res = stats.isFile()
        res ? resolve(true) : resolve(false)
      }
    })
  })
}


/**
 * @desc 复制文件
 * @param {string} fromPath 复制的文件或文件夹
 * @param {string} toPath 如果toPath既不是文件也不是文件夹将会直接被重命名
 */
const copy = (fromPath, toPath) => {
  const from = path.resolve(fromPath)
  const to = path.resolve(toPath)

  // 复制文件
  const copyFile = (fromPath, toPath) => {
    return new Promise(resolve => {
      fsPromise.stat(fromPath).then(async stat => {
        const resolvePath = path.resolve(fromPath)
        const start = resolvePath.lastIndexOf(path.sep)
        const substr = resolvePath.substr(start + 1, fromPath.length)

        if (stat?.isFile()) {
          if (!await checkFile(toPath)) {
            // 如果toPath是文件夹就截取fromPath的文件名，然后在拷贝，否则直接拷贝
            if (await checkDirectory(toPath)) {
              await fsPromise.copyFile(resolvePath, path.resolve(toPath, substr))
              resolve(true)
            } else {
              await fsPromise.copyFile(resolvePath, toPath)
              resolve(true)
            }
          }
        }
      })
    })
  }

  // 复制文件夹
  const copyDirectory = async (fromPath, toPath) => {
    return new Promise(resolve => {
      fsPromise.stat(fromPath).then(async stats => {
        const filePath = fs.readdirSync(fromPath)
        if (stats.isDirectory()) {
          if (!await checkDirectory(toPath)) {
            fs.mkdirSync(toPath)
          }
         
          for await (let file of filePath) {
            const startPath = fromPath + path.sep + file
            const endPath = toPath + path.sep + file
            const res = await fsPromise.stat(startPath)
            res.isFile() ? await copyFile(startPath, endPath) : await copyDirectory(startPath, endPath)
          }
          resolve(true)
        }
      })
    })
  }

  // 复制
  return new Promise(resolve => {
    fsPromise.stat(from).then(async res => {
      if (res.isDirectory()) {
        if (!await checkDirectory(to)) {
          fs.mkdirSync(to)
          await copyDirectory(from, to)
          resolve(true)
        } else {
          const start = from.lastIndexOf(path.sep)
          const substr = from.substr(start + 1, from.length)
          await copyDirectory(from, path.resolve(to, substr))
          resolve(true)
        }
      } else {
        await copyFile(from, to)
        resolve(true)
      }
    })
  })
}

const mkdir = async (Path) => {
  const dirname = path.resolve(Path)
    /**
     * path.sep 处理win mac下的文件分隔符
     * win是\ mac是/
     */
    const arr = dirname.split(path.sep)
    let str = ''
    for (let i = 0; i < arr.length; i++) {
      str = str + arr[i] + '/'
      if (!await checkDirectory(str)) {
        fs.mkdirSync(str)
      }
    }
}


exports.checkDirectory = checkDirectory
exports.checkFile = checkFile
exports.copy = copy
exports.mkdir = mkdir
