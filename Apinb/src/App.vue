<template>
  <div class="app-container flex-row">
    <div class="col-8 aside" style="border-right: 1px solid var(--color-back-2)">
      <header class="pad-8px">
        <h2 class="no-margin">Scenarios</h2>
      </header>
      <main class="pad-8px">
        <ListItem v-for="scenario of apinb.scenarios" 
          :active="scenario.key == apinb.selection"
          @click="() => apinb.selectScenario(scenario)"
          class="text-small margin-bottom-05">
          <span>{{scenario.caption}}</span>
        </ListItem>
        <ListItem @click="() => apinb.addScenario()" 
          class="button-add text-small text-center">
          <span>+ create scenario</span>
        </ListItem>
      </main>
    </div>
    <div class="col-22 main" v-if="activeScenario">
      <header class="pad-8px">
        <EditableHeader v-model="activeScenario.caption" class="h2 no-margin" 
          @click="() => activeScenario.selectRequest(undefined)" />
      </header>
      <main class="pad-8px">
        <div class="margin-bottom-1"
          @click="() => activeScenario.selectRequest(undefined)">
          <div class="tiny-text">Description</div>
          <EditableParagraph v-model="activeScenario.description" />
          <div class="tiny-text">Base URL</div>
          <EditableCodeLine v-model="activeScenario.baseurl" />
        </div>
        <template v-for="(request, index) in activeScenario.requests" :key="request.key">
          <RequestView :request="request" 
            :active="request.key == activeScenario.selection"
            @runThis="() => activeScenario.run(request)" 
            @runUntilThis="() => activeScenario.runUntil(request)"
            @clearLogs="() => request.clearLogs()"
            @removeThis="() => activeScenario.removeRequest(request)" 
            @click="() => activeScenario.selectRequest(request)" 
            class="margin-bottom-05" />
          <ListItem @click="() => activeScenario.insertRequestAfter(index)" 
            class="only-on-hover text-small text-gray text-center margin-bottom-05">
            <span>+ create request</span>
          </ListItem>
        </template>
        <div style="height: 4rem"></div>
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
      return this.apinb.scenarios.find(item => item.key == this.apinb.selection) 
          || this.apinb.scenarios[0]
    }
  },
  methods: {
    
  },
  mounted () {
    
  }
}
</script>

<style>

</style>
