import { isArray, isObject, ensureProp } from "./safety.js"
import ApinbScenario from "./ApinbScenario.js"

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
            let newScenario = ApinbScenario()
            newScenario.key = this.scenarios
                .reduce((prev, item) => (item.key > prev) ? item.key : prev, -1) + 1
            this.scenarios.push(newScenario)
            this.selectScenario(newScenario)
        },

        selectScenario (scenario) {
            if (!scenario) this.selection = undefined
            else this.selection = scenario.key
        }
    }
}

export default ApinbDocument
