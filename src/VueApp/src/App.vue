<template>
  <div class="app-container flex-row">
    <div class="col-8 aside" style="border-right: 1px solid var(--color-back-2)">
      <header class="pad-8px">
        <h2>Scenarios</h2>
      </header>
      <main class="pad-8px">
        <ListItem v-for="(item, key) in apinb.scenarios" 
          :active="key == apinb.selectedScenario"
          @selected="() => apinb.selectedScenario = key">
          <span class="small-text">[{{key}}] {{item.caption}}</span>
        </ListItem>
      </main>
    </div>
    <div class="col-1"></div>
    <div class="col-21 pad-8px main">
      <h2>{{activeScenario.caption}}</h2>
      <EditableParagraph v-model="activeScenario.description" />
      <div v-for="(request, key) in activeScenario.requests" :key="key">
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
      return this.apinb.scenarios[this.apinb.selectedScenario]
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
