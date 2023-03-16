import { jsonTryParse } from "./json.js"
import axios from "axios"

function alwaysTrue() {
    return true
}

function AxiosWrapper() {
    
    let auth = ""

    let runAxiosRequest = (method, options, extraOptions) => {
        let promise = axios ({
            method: method,
            url: options?.url ?? extraOptions?.url,
            baseURL: options?.baseurl ?? extraOptions?.baseurl,
            headers: { 
                "Authorization": auth, 
                "Content-Type": options.contentType ?? extraOptions.contentType ?? "application/json"
            },
            params: options.params,
            data: options.data,
            validateStatus: alwaysTrue
        })
        promise.then(response => {
            auth = response.headers["authorization"] ?? auth
        })
        return promise
    }

    return {
        "get" (options, extraOptions = null) {
            console.log(options)
            console.log(extraOptions)
            return runAxiosRequest("get", options, extraOptions)
        },
        "post" (options, extraOptions = null) {
            return runAxiosRequest("post", options, extraOptions)
        },
        "put" (options, extraOptions = null) {
            return runAxiosRequest("put", options, extraOptions)
        },
        "delete" (options, extraOptions = null) {
            return runAxiosRequest("delete", options, extraOptions)
        }
    }
}

export default AxiosWrapper
