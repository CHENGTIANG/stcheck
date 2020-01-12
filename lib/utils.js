const minimatch = require('minimatch');
const path = require("path"), fs = require("fs")


const getAllFilePath = (dirPath) => {
    const stat = fs.statSync(dirPath)
    if (stat.isFile()) {
        return [dirPath]
    }
    const result = []
    const dirs = fs.readdirSync(dirPath)
    for (let i in dirs) {
        const p = path.join(dirPath, dirs[i])
        const stat = fs.statSync(p)
        if (stat.isDirectory()) {
            result.push(...getAllFilePath(p))

        } else if (stat.isFile()) {
            result.push(p)
        }
    }
    return result
}

const getFilePathList = (paths) => {
    const result = []
    for (let i in paths) {
        const item = paths[i]
        result.push(...getAllFilePath(item))
    }
    return Array.from(new Set(result))
}

const readFileContent = (filePath) => {
    return fs.readFileSync(filePath, "utf8").replace(/^\ufeff/u, "");
}

module.exports = {
    match(target, pattern) {
        return minimatch(target, pattern, {
            matchBase: true,
            dot: true
        })
    },
    getFilePathList,
    readFileContent,
    getAllFilePath
}