function isString (o) {
    return typeof(o) == "string"
}

function isNumber (o) {
    return typeof(o) == "number"
}

function isObject (o) {
    return typeof(o) == "object"
}

function isArray (o) {
    return o?.constructor == Array
}

function isFunction (f) {
    return typeof(f) == "function"  
}

function ensureProp (propName, predicate) {
    var _this = this
    return {
        or (newValue) {
            if (!predicate(_this[propName])) {
                _this[propName] = newValue
            } 
        }
    }
}

export {
    isString,
    isNumber,
    isObject,
    isArray,
    isFunction,
    ensureProp
}
