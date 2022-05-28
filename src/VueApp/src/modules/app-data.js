import axios from "axios"

const deepCopy = el => JSON.parse(JSON.stringify(el))
const isString = o => typeof(o) == "string"
const isNumber = o => typeof(o) == "number"
const isObject = o => typeof(o) == "object"
const isArray = o => typeof(o) == "object" &&
                     typeof(o.forEach) == "function"

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

var AXIOS_RUN = {
  "get": (options) => axios({
    method: "get",
    url: options.url,
    params: JSON.parse(options.params)
  }),
  "delete": (options) => axios({
    method: "delete",
    url: options.url,
    params: JSON.parse(options.params)
  }),
  "post": (options) => axios({
    method: "post",
    url: options.url,
    data: JSON.parse(options.data)
  }),
  "put": (options) => axios({
    method: "put",
    url: options.url,
    data: JSON.parse(options.data)
  }),
}

function ApinbRequest (options = {}) {
  if (!isObject(options)) options = {}
  options.ensureProp = ensureProp
  options.ensureProp("url", isString).or("/")
  options.ensureProp("method", isString).or("get")
  options.ensureProp("data", isString).or("")
  options.ensureProp("params", isString).or("")
  options.ensureProp("logs", isString).or("")

  return {
    key: options.key,
    url: options.url,
    method: options.method,
    data: options.data,
    params: options.params,
    logs: options.logs,

    run () {
      console.log("Running...")
      this.logs = ""
      AXIOS_RUN[this.method](this)
      .then(r => {
        this.logs = JSON.stringify(r.data, null, "  ")
      })
      .catch(error => {
        this.logs += "\n"
        this.logs += error
      })
    }
  }
}

function ApinbScenario (options = {}) {
  if (!isObject(options)) options = {}
  options.ensureProp = ensureProp
  options.ensureProp("caption", isString).or("New scenario")
  options.ensureProp("description", isString).or("Description of this scenario")
  options.ensureProp("requests", isArray).or([{ key: 1 }])

  return {
    key: options.key,
    caption: options.caption,
    description: options.description,
    requests: options.requests.map(r => ApinbRequest(r)),
    selection: undefined,

    addRequest () {
      var newRequest = ApinbRequest()
      newRequest.key = this.requests
        .reduce((prev, item) => (item.key > prev) ? item.key : prev, -1) + 1
      this.requests.push(newRequest)
      this.selectRequest(newRequest)
    },

    removeRequest (request) {
      var index = this.requests.findIndex(item => item == request)
      this.requests.splice(index, 1)
      this.selectRequest(undefined)
    },

    selectRequest (request) {
      this.selection = request.key
    },

    run (request) {
      request.run()
    },

    runUntil (request) {
      for (var r of this.requests) {
        r.run()
        if (r == request) break;
      }
    } 
  }
}

function ApinbDocument (options = {}) {
  if (!isObject(options)) options = {}
  options.ensureProp = ensureProp
  options.ensureProp("scenarios", isArray).or([{ key: 1 }])
  
  return {
    scenarios: options.scenarios.map(s => ApinbScenario(s)),
    selection: undefined,

    save () {
      console.log("Action 'save' was not implemented")
    },
    
    addScenario () {
      var newScenario = ApinbScenario()
      newScenario.key = this.scenarios
        .reduce((prev, item) => (item.key > prev) ? item.key : prev, -1) + 1
      this.scenarios.push(newScenario)
      this.selectScenario(newScenario)
    },

    selectScenario (scenario) {
      this.selection = scenario.key
    }
  }
}

const KEY = "apinb-document"
const DEFAULT_OPTIONS = {
  "scenarios": [
    {
      "key": 1,
      "caption": "New scenario",
      "description": "Welcome to apinb!",
      "requests": [
        {
          "key": 1,
          "url": "/api/hello",
          "method": "get"
        },
        {
          "key": 2,
          "url": "/api/object",
          "method": "post",
          "data": JSON.stringify({
            "name": "Dmitriy",
            "surname": "Naumov",
            "age": 3
          }, null, "  ")
        }
      ]
    }
  ]
}

export default {
  instance () {
    var options = JSON.parse(window.localStorage[KEY] || null) || DEFAULT_OPTIONS
    return ApinbDocument(options)
  }
}
