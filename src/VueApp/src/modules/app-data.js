const KEY = "apinb-document"
const DEFAULT_ENCODED = `{
  "scenarios": {
    "0001": {
      "caption": "New scenario",
      "description": "Welcome to apinb!",
      "requests": {
        "0001": {
          "url": "/api/hello",
          "method": "get"
        }
      }
    }
  },
  "selectedScenario": "0001"
}`

export default {
  getApinb () {
    var encoded = window.localStorage[KEY] || DEFAULT_ENCODED
    return JSON.parse(encoded)
  },
  setApinb (value) {
    var encoded = JSON.stringify(value)
    window.localStorage[KEY] = encoded 
  }
}