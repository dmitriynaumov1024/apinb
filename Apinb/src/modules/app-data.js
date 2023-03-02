import { isString, isNumber, isArray, isObject, ensureProp } from "./safety.js"
import { jsonStringify, jsonTryParse, jsonPretty } from "./json.js"

import ApinbDocument from "./ApinbDocument.js"

const KEY = "apinb-document"
const DEFAULT_OPTIONS = {
    "scenarios": [
        {
            "key": 1,
            "caption": "New scenario",
            "description": "Welcome to apinb!",
            "baseurl": "",
            "requests": [
                {
                    "key": 1,
                    "url": "/api/average",
                    "method": "post",
                    "data": "[ 1.3, -2.75, 3, -4.5, 4.5, 6.2, 7.8 ]"
                },
                {
                    "key": 2,
                    "url": "/api/object",
                    "method": "post",
                    "data": jsonPretty({
                        "name": "Dmitriy",
                        "surname": "Naumov",
                        "age": 3
                    })
                }
            ]
        }
    ]
}

let apinbInstance = undefined

function saveApinbDocumentToLocalStorage() {
    console.log("Saving...")
    console.log(this)
    window.localStorage[KEY] = jsonStringify({
        scenarios: this.scenarios.map(s => ({
            key: s.key,
            caption: s.caption,
            description: s.description,
            baseurl: s.baseurl,
            requests: s.requests.map(r => ({
                key: r.key,
                url: r.url,
                method: r.method,
                data: r.data,
                params: r.params,
                status: r.status,
                logs: r.logs
            }))
        })),
        selection: this.selection
    })
    console.log("Saved.")
}

export default {
    instance () {
        if (!apinbInstance) {
            let options = jsonTryParse(window.localStorage[KEY]) ?? DEFAULT_OPTIONS
            apinbInstance = ApinbDocument(options)
            apinbInstance.save = saveApinbDocumentToLocalStorage
        }
        return apinbInstance
    }
}
