import { v4 as UUIDv4 } from "uuid"
import { isArray, isObject, ensureProp } from "./safety.js"
import ApinbScenario from "./ApinbScenario.js"

function ApinbDocument (options = {}) {
    if (!isObject(options)) options = {}
    options.ensureProp = ensureProp
    options.ensureProp("scenarios", isArray).or([{ key: 1 }])
    
    return {
        id: options.id ?? UUIDv4(),

        selection: options.selection,

        scenarios: options.scenarios.map(s => ApinbScenario(s)),

        save () {
            console.log("Action 'save' was not implemented")
        },
        
        addScenario () {
            let newScenario = ApinbScenario()
            newScenario.key = this.scenarios
                .reduce((prev, item) => (item.key > prev) ? item.key : prev, -1) + 1
            this.scenarios.push(newScenario)
            this.selectScenario(newScenario)
        },

        selectScenario (scenario) {
            if (!scenario) this.selection = undefined
            else this.selection = scenario.key
        },

        plainCopy () {
            return {
                id: this.id,
                selection: this.selection,
                scenarios: this.scenarios.map(s => ({
                    key: s.key,
                    caption: s.caption,
                    description: s.description,
                    baseurl: s.baseurl,
                    requests: s.requests.map(r => ({
                        key: r.key,
                        url: r.url,
                        method: r.method,
                        data: r.data,
                        params: r.params,
                        status: r.status,
                        logs: r.logs
                    }))
                }))
            }
        }
    }
}

export default ApinbDocument
