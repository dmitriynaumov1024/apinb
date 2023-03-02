```
document: {
  scenarios: [{
    key: Number,
    caption: String,
    description: String,
    baseurl: String,
    requests: [{
      key: Number,
      url: String,
      method: String,
      data?: Object,
      params?: Object
    }]
  }]
}

```

```
Apinb
+ instance(): ApinbDocument


ApinbDocument
+ scenarios: [ApinbScenario]
+ selection: Number
+ save() 
+ addScenario(): Number
+ selectScenario(ApinbScenario)


ApinbScenario
+ key: Number
+ caption: String
+ description: String
+ requests: [ApinbRequest]
+ selection: Number
+ addRequest()
+ insertRequestAfter(Number)
+ removeRequest(ApinbRequest)
+ selectRequest(ApinbRequest)
+ run (ApinbRequest)
+ runUntil (ApinbRequest)


ApinbRequest
+ key: Number
+ url: String
+ method: String
+ data?: String
+ params?: String
+ logs?: String

```