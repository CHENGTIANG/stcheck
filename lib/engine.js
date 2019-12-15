const path = require("path"), fs = require("fs")
const { getFilePathList, readFileContent } = require("./file_util")

class STEngine {
    constructor(options) {
        options = Object.assign({ paths: [], ignorePaths: [], ignoreTexts: [], cwd: process.cwd(), ignoreAnotation: true }, options)
        this.options = options || {}
    }
    find(text, dict) {
        if (typeof text !== 'string') {
            throw ('必須為字符串')
        }
        const zhText = text.match(/[\u4e00-\u9fa5]/g)
        const result = []
        for (let i in zhText) {
            const c = zhText[i]
            if (dict[c] && c !== dict[c]) {
                result.push([c, dict[c]])
            }
        }
        return result
    }
    todo(files, dict = {}) {
        const result = []
        for (let i in files) {
            const file = files[i]
            let content = readFileContent(file)

            if (this.options.ignoreAnotation) {
                // 去除注释
                content = content.replace(/\/\*[\s\S]*\*\/|\/\/.*|<!--.*-->/g, "")
            }


            // 忽略文字
            const { ignoreTexts = [] } = this.options || {}
            for (let i in ignoreTexts) {
                const text = ignoreTexts[i]
                if (text) {
                    content = content.replace(new RegExp(text, 'g'), "")
                }
            }

            const zhText = content.match(/[\u4e00-\u9fa5]/g)

            if (!zhText) {
                continue
            }

            const res = this.find(zhText.join(""), dict)
            if (res.length) {
                result.push({
                    file,
                    data: res
                })
            }

        }
        return result
    }

    convert(text, dict) {
        if (typeof text !== 'string') {
            throw ('必須為字符串')
        }
        for (let i in text) {
            const c = text[i]
            if (dict[c] && c !== dict[c]) {
                text = text.replace(c, dict[c])
            }
        }
        return text
    }

    check() {
        const options = this.options
        const { dict = {} } = options
        const cwd = options.cwd
        const paths = (options.paths || []).map(ele => {
            return path.join(cwd, ele)
        })
        let files = getFilePathList(paths)
        const ignorePaths = (options.ignorePaths || [])


        for (let i in ignorePaths) {
            const regex = new RegExp(ignorePaths[i])
            files = files.filter(ele => !ele.match(regex))
        }

        this.todo(files, dict).forEach(ele => {
            console.log(ele.file)
            console.log(ele.data.map(ele => `${ele[0]} => ${ele[1]}`))
        });
    }
}

module.exports = STEngine
