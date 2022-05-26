```
document: {
  scenarios: [{
    key: Number,
    caption: String,
    description: String,
    requests: [{
      key: Number,
      url: String,
      method: String,
      data?: Object,
      params?: Object
    }]
  }],
  selectedScenario: Number
}
```