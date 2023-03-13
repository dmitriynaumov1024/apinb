import { isString, isNumber, isArray, isObject, ensureProp } from "./safety.js"
import { jsonStringify, jsonParse, jsonTryParse, jsonPretty } from "./json.js"
import { v4 as UUIDv4 } from "uuid"
import { saveAs } from "file-saver"

import ApinbDocument from "./ApinbDocument.js"

const KEY = "apinb-document"
const DEFAULT_OPTIONS = {
    "id": UUIDv4(),
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

let instance = undefined

export default {
    instance() {
        if (! instance) {
            let options = jsonTryParse(window.localStorage[KEY]) ?? DEFAULT_OPTIONS
            instance = ApinbDocument(options)
        }
        return instance
    },
    saveDocument () {
        if (! instance) {
            return
        }
        console.log("Saving...")
        let resultText = jsonStringify(instance.plainCopy())
        window.localStorage[KEY + "-" + instance.id] = resultText
        window.localStorage[KEY] = resultText
        console.log("Saved.")
    },
    newDocument () {
        if (instance) {
            this.saveDocument()
        }
        return new Promise((resolve, reject) => {
            instance = ApinbDocument({})
            resolve(instance)
        })
    },
    loadDocument () {
        console.error("load: not implemented yet")
    },
    importDocument (file) {
        if (instance) {
            this.saveDocument()
        }
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.addEventListener("load", () => {
                try {
                    instance = ApinbDocument(jsonParse(reader.result))
                    resolve(instance)
                }
                catch (error) {
                    reject(error)
                }
            })
            reader.addEventListener("error", () => {
                reject(reader.error)
            })
            reader.readAsText(file)
        })
    },
    exportDocument () {
        console.log("Exporting...")
        if (!instance) {
            console.error("Export failed: no active instance")
            return
        }
        let resultText = jsonPretty(instance.plainCopy())
        let resultFile = new File([resultText], "document.apinb", {
            type: "application/json;charset=utf-8;"
        })
        window.lastExportedFile = resultFile
        saveAs(resultFile)
        console.log("Done.")
    }

}
