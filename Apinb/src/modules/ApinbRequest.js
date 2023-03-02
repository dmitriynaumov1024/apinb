import { isString, isNumber, isObject, ensureProp } from "./safety.js"
import { jsonStringify, jsonTryParse, jsonPretty } from "./json.js"

function ApinbRequest (options = {}) {
    if (!isObject(options)) options = {}
    options.ensureProp = ensureProp
    options.ensureProp("url", isString).or("/")
    options.ensureProp("method", isString).or("get")
    options.ensureProp("data", isString).or("")
    options.ensureProp("params", isString).or("")
    options.ensureProp("status", isNumber).or(null)
    options.ensureProp("logs", isString).or("")

    return {
        key: options.key,
        url: options.url,
        method: options.method,
        data: options.data,
        params: options.params,
        status: options.status,
        logs: options.logs,

        run (requestRunner, extraOptions = null) {
            console.log("Running...")
            this.logs = ""
            let options = {
                url: this.url,
                params: jsonTryParse(this.params) ?? {},
                data: jsonTryParse(this.data) ?? {}
            }
            requestRunner[this.method](options, extraOptions)
            .then(r => {
                this.status = r.status
                this.logs = jsonPretty(r.data)
            })
            .catch(error => {
                if (this.logs.length > 0) this.logs += "\n"
                this.logs += error
                if (!error.response) this.status = null
            })
        },

        clearLogs () {
            this.logs = ""
        }
    }
}

export default ApinbRequest
