<template>
  <div class="app-container flex-row">
    <div class="col-8 aside">
      <header>
        <div class="flex-stripe">
          <button class="none" @click="menuButtonClick">
            <IconMenu class="icon-2em" :active="menu.expanded" /> 
          </button>
          <h2 class="no-margin pad-8px">
            Scenarios
          </h2>
        </div>
        <div class="expandable-menu" v-if="menu.expanded">
          <div class="pad-8px">
            <ListItem @click="newMenuItemClick" 
              title="Save this to local storage and Create new document"
              class="text-small margin-bottom-025">
              - New document
            </ListItem>
            <ListItem @click="loadMenuItemClick" 
              title="Load document from local storage"
              class="text-small margin-bottom-025">
              - Load
            </ListItem>
            <ListItem 
              title="Import apinb file"
              class="text-small margin-bottom-025">
              <label for="import-file-input">- Import</label>
              <input type="file" id="import-file-input" class="hidden" accept="*/*" @change="importFileSelected" />
            </ListItem>
            <ListItem @click="exportMenuItemClick" 
              title="Export this as apinb file"
              class="text-small margin-bottom-025">
              - Export
            </ListItem>
          </div>
        </div>
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
import IconMenu from "./components/icons/Menu.vue"

export default {
  components: { 
    ListItem,
    EditableParagraph,
    EditableHeader,
    EditableCodeLine,
    EditableCodeBlock,
    RequestView,
    IconMenu
  },
  data () {
    return {
      apinb: Apinb.instance(),
      menu: {
        expanded: false
      }
    }
  },
  computed: {
    activeScenario () {
      return this.apinb.scenarios.find(item => item.key == this.apinb.selection) 
          || this.apinb.scenarios[0]
    }
  },
  methods: {
    menuButtonClick () {
      this.menu.expanded = !(this.menu.expanded)
    },
    newMenuItemClick () {
      Apinb.newDocument()
      .then(result => {
        this.apinb = result
        this.menu.expanded = false
      })
    },
    loadMenuItemClick () {
      Apinb.loadDocument()
    },
    importFileSelected () {
      let importedFile = document.querySelector("#import-file-input").files[0]
      Apinb.importDocument(importedFile)
      .then(result => {
        this.apinb = result
        this.menu.expanded = false
      })
      .catch(error => {
        console.error(error)
      })
    },
    exportMenuItemClick () {
      Apinb.exportDocument()
    }
  },
  mounted () {
    
  }
}
</script>

<style>

</style>
