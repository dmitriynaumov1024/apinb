const KEY = "apinb-document"
const DEFAULT_ENCODED = `{
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
          "method": "post"
        }
      ]
    }
  ],
  "selectedScenario": 1
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