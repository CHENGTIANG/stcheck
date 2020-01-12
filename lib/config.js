const path = require("path"), fs = require("fs")
const { readFileContent } = require("./utils")

function getConfigPath(configPath) {
    return path.resolve(process.cwd(), configPath || "./st.config.json")
}

function getConfig(configPath) {
    try {
        return JSON.parse(readFileContent(getConfigPath(configPath)))
    } catch (error) {
        if(!configPath){
            return JSON.parse(readFileContent(path.join(__dirname, "../../st.config.json")))
        }
       throw(error)
    }
}

module.exports = {
    getConfigPath,
    getConfig
}
