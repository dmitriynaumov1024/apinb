<template>
  <div class="app-container flex-row">
    <div class="col-8 aside" style="border-right: 1px solid var(--color-back-2)">
      <header class="pad-8px">
        <h2 class="no-margin">Scenarios</h2>
      </header>
      <main class="pad-8px">
        <ListItem v-for="scenario of apinb.scenarios" 
          :active="scenario == activeScenario"
          @click="() => selectScenario(scenario.key)"
          class="small-text">
          <span>{{scenario.caption}}</span>
        </ListItem>
        <ListItem @click="() => addScenario()" 
          class="button-add small-text text-center">
          <span>+ create new</span>
        </ListItem>
      </main>
    </div>
    <div class="col-1"></div>
    <div class="col-21 pad-8px main" v-if="activeScenario">
      <h2>{{activeScenario.caption}}</h2>
      <EditableParagraph v-model="activeScenario.description" />
      <div v-for="request of activeScenario.requests" :key="request.key">
        <RequestView :request="request" />
      </div>
      <div style="height: 8rem"></div>
    </div>
  </div>
</template>

<script>
import AppData from "./modules/app-data.js"
import ListItem from "./components/ListItem.vue"
import EditableParagraph from "./components/EditableParagraph.vue"
import EditableCodeLine from "./components/EditableCodeLine.vue"
import EditableCodeBlock from "./components/EditableCodeBlock.vue"
import RequestView from "./components/RequestView.vue"

export default {
  components: { 
    ListItem,
    EditableParagraph,
    EditableCodeLine,
    EditableCodeBlock,
    RequestView
  },
  data () {
    return {
      apinb: AppData.getApinb()
    }
  },
  computed: {
    activeScenario () {
      return this.apinb.scenarios
        .find(item => item.key == this.apinb.selectedScenario)
    }
  },
  methods: {
    addScenario () {
      var newKey = this.apinb.scenarios
        .reduce((prev, item) => (item.key > prev) ? item.key : prev, -1) + 1
      this.apinb.scenarios.push({
        key: newKey,
        caption: `Scenario #${newKey}`,
        description: "Add your description here...",
        requests: [
          {
            key: 1,
            method: "get",
            url: "",
            params: ""
          }
        ]
      })
      this.apinb.selectedScenario = newKey
    },
    selectScenario (key) {
      this.apinb.selectedScenario = key
    }
  }
}
</script>

<style>

</style>
