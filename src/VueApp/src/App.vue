<template>
  <div class="app-container flex-row">
    <div class="col-8 aside" style="border-right: 1px solid var(--color-back-2)">
      <header class="pad-8px">
        <h2 class="no-margin">Scenarios</h2>
      </header>
      <main class="pad-8px">
        <ListItem v-for="scenario of apinb.scenarios" 
          :active="scenario.key == selected.scenario"
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
    <div class="col-21 main" v-if="activeScenario">
      <header class="pad-8px">
        <EditableHeader v-model="activeScenario.caption" class="h2 no-margin" 
          @click="() => selectRequest(undefined)" />
      </header>
      <main class="pad-8px">
        <EditableParagraph v-model="activeScenario.description" 
          @click="() => selectRequest(undefined)" />
        <div v-for="request of activeScenario.requests" :key="request.key">
          <RequestView :request="request" 
            :active="request.key == selected.request"
            @runThis="" 
            @runUntilThis=""
            @removeThis="" 
            @click="() => selectRequest(request.key)" />
        </div>
        <div>
          <ListItem @click="() => addRequest()" 
            class="button-add text-center">
            <span>+ create new</span>
          </ListItem>
        </div>
        <div style="height: 8rem"></div>
      </main>
    </div>
  </div>
</template>

<script>
import AppData from "./modules/app-data.js"
import ListItem from "./components/ListItem.vue"
import EditableParagraph from "./components/EditableParagraph.vue"
import EditableHeader from "./components/EditableHeader.vue"
import EditableCodeLine from "./components/EditableCodeLine.vue"
import EditableCodeBlock from "./components/EditableCodeBlock.vue"
import RequestView from "./components/RequestView.vue"

export default {
  components: { 
    ListItem,
    EditableParagraph,
    EditableHeader,
    EditableCodeLine,
    EditableCodeBlock,
    RequestView
  },
  data () {
    return {
      apinb: AppData.getApinb(),
      selected: {
        scenario: undefined,
        request: undefined
      }
    }
  },
  computed: {
    activeScenario () {
      return this.apinb.scenarios
        .find(item => item.key == this.selected.scenario)
    }
  },
  methods: {
    addRequest () {
      console.log("addRequest")
      var requests = this.activeScenario.requests
      var newKey = requests
        .reduce((prev, item) => (item.key > prev) ? item.key : prev, -1) + 1
      requests.push({
        key: newKey,
        method: "get",
        url: "",
        params: ""
      })
      this.selectRequest(newKey)
    },
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
      this.selectScenario(newKey)
    },
    selectScenario (key) {
      this.selected.request = undefined
      this.selected.scenario = key
    },
    selectRequest (key) {
      this.selected.request = key
    }
  }
}
</script>

<style>

</style>
