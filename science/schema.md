```
document: {
  scenarios: [{
    key: String,
    value: {
      caption: String,
      description: String,
      requests: [{
        key: String,
        value: {
          url: String,
          method: String,
          data?: Object,
          params?: Object
        }
      }]
    }
  }],
  selectedScenario: String
}
```