<template>
  <div class="app-container flex-row">
    <div class="col-8 aside" style="border-right: 1px solid var(--color-back-2)">
      <header class="pad-8px">
        <h2 class="no-margin">Scenarios</h2>
      </header>
      <main class="pad-8px">
        <ListItem v-for="scenario of apinb.scenarios" 
          :active="scenario.key == apinb.selection"
          @click="() => selectScenario(scenario)"
          class="small-text">
          <span>{{scenario.caption}}</span>
        </ListItem>
        <ListItem @click="() => addScenario()" 
          class="button-add small-text text-center">
          <span>+ create new</span>
        </ListItem>
      </main>
    </div>
    <div class="col-22 main" v-if="activeScenario">
      <header class="pad-8px">
        <EditableHeader v-model="activeScenario.caption" class="h2 no-margin" 
          @click="() => selectRequest(undefined)" />
      </header>
      <main class="pad-8px">
        <EditableParagraph v-model="activeScenario.description" 
          @click="() => selectRequest(undefined)" />
        <RequestView v-for="request of activeScenario.requests" 
          :key="request.key"
          :request="request" 
          :active="request.key == activeScenario.selection"
          @runThis="() => activeScenario.run(request)" 
          @runUntilThis="() => activeScenario.runUntil(request)"
          @removeThis="() => removeRequest(request)" 
          @click="() => selectRequest(request.key)" />
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
import Apinb from "./modules/app-data.js"
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
      apinb: Apinb.instance()
    }
  },
  computed: {
    activeScenario () {
      return this.apinb.scenarios
        .find(item => item.key == this.apinb.selection)
    }
  },
  methods: {
    addScenario () {
      this.apinb.addScenario()
    },
    selectScenario (scenario) {
      this.apinb.selectScenario(scenario)
    },
    addRequest () {
      this.activeScenario.addRequest()
    },
    selectRequest (request) {
      this.activeScenario.selectRequest(request)
    },
    removeRequest (request) {
      this.activeScenario.removeRequest(request)
    }
  },
  mounted () {
    
  }
}
</script>

<style>

</style>
