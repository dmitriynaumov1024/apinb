const jsonStringify = JSON.stringify

function jsonPretty (obj) {
    return JSON.stringify(obj, null, "  ")
}

function jsonParse (str) {
    return JSON.parse(str)
}

function jsonTryParse (str, fallbackValue = null) {
    try {
        return JSON.parse(str)
    }
    catch (error) {
        return fallbackValue
    }
}

export {
    jsonStringify,
    jsonPretty,
    jsonParse,
    jsonTryParse
}
