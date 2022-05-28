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

  this.key = options.key
  this.url = options.url
  this.method = options.method
  this.data = options.data
  this.params = options.params
  this.logs = options.logs

  this.run = () => {
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

function ApinbScenario (options = {}) {
  if (!isObject(options)) options = {}
  options.ensureProp = ensureProp
  options.ensureProp("caption", isString).or("New scenario")
  options.ensureProp("description", isString).or("Description of this scenario")
  options.ensureProp("requests", isArray).or([{ key: 1 }])

  this.key = options.key
  this.caption = options.caption
  this.description = options.description
  this.requests = options.requests.map(r => new ApinbRequest(r))
  this.selection = undefined

  this.addRequest = () => {
    var newRequest = new ApinbRequest()
    newRequest.key = this.requests
      .reduce((prev, item) => (item.key > prev) ? item.key : prev, -1) + 1
    this.requests.push(newRequest)
    this.selectRequest(newRequest)
  }

  this.removeRequest = (request) => {
    var index = this.requests.findIndex(item => item == request)
    this.requests.splice(index, 1)
    this.selectRequest(undefined)
  }

  this.selectRequest = (request) => {
    this.selection = request.key
  }

  this.run = (request) => {
    request.run()
  }

  this.runUntil = (request) => {
    for (var r of this.requests) {
      r.run()
      if (r == request) break;
    }
  } 
}

function ApinbDocument (options = {}) {
  if (!isObject(options)) options = {}
  options.ensureProp = ensureProp
  options.ensureProp("scenarios", isArray).or([{ key: 1 }])
  
  this.scenarios = options.scenarios.map(s => new ApinbScenario(s))
  this.selection = undefined

  this.save = () => {
    console.log("Action 'save' was not implemented")
  }
  
  this.addScenario = () => {
    var newScenario = new ApinbScenario()
    newScenario.key = this.scenarios
      .reduce((prev, item) => (item.key > prev) ? item.key : prev, -1) + 1
    this.scenarios.push(newScenario)
    this.selectScenario(newScenario)
  }

  this.selectScenario = (scenario) => {
    this.selection = scenario.key
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
    return new ApinbDocument(options)
  }
}