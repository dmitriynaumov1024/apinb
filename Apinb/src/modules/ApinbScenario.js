import { isString, isNumber, isArray, isObject, ensureProp } from "./safety.js"
import { jsonStringify, jsonTryParse, jsonPretty } from "./json.js"
import AxiosWrapper from "./AxiosWrapper.js"
import ApinbRequest from "./ApinbRequest.js"

function ApinbScenario (options = {}) {
    if (!isObject(options)) options = {}
    options.ensureProp = ensureProp
    options.ensureProp("caption", isString).or("New scenario")
    options.ensureProp("description", isString).or("Description of this scenario")
    options.ensureProp("requests", isArray).or([{ key: 1 }])

    let privateRequestRunner = AxiosWrapper()

    let scenario = {
        key: options.key,
        baseurl: options.baseurl,
        caption: options.caption,
        description: options.description,
        requests: options.requests.map(r => ApinbRequest(r)),
        selection: undefined,

        addRequest () {
            let newRequest = ApinbRequest()
            newRequest.key = this.requests
                .reduce((prev, item) => (item.key > prev) ? item.key : prev, -1) + 1
            this.requests.push(newRequest)
            this.selectRequest(newRequest)
        },

        insertRequestAfter (index) {
            let newRequest = ApinbRequest()
            newRequest.key = this.requests
                .reduce((prev, item) => (item.key > prev) ? item.key : prev, -1) + 1
            let tailRequests = this.requests.splice(index + 1)
            this.requests = this.requests.concat(newRequest, tailRequests)
            this.selectRequest(newRequest)
        },

        removeRequest (request) {
            let index = this.requests.findIndex(item => item == request)
            this.requests.splice(index, 1)
            this.selectRequest(undefined)
        },

        selectRequest (request) {
            if (!request) this.selection = undefined
            else this.selection = request.key
        },

        run (request) {
            request.run(privateRequestRunner, { baseurl: this.baseurl })
        },

        runUntil (request) {
            for (const r of this.requests) {
                r.run(privateRequestRunner, { baseurl: this.baseurl })
                if (r == request) break
            }
        } 
    }

    return scenario
}

export default ApinbScenario
