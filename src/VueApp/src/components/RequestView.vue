<template>
  <div class="flex-row margin-bottom">
    <div class="col-6">
      <div class="tiny-text pad-0-4px">Method</div>
      <EditableCodeLine v-model="request.method" />
    </div>
    <div class="col-1"></div>
    <div class="col-23">
      <div class="tiny-text pad-0-4px">URL</div>
      <EditableCodeLine v-model="request.url"/>
    </div>
  </div>
  <div v-if="mustHavePayload" class="margin-bottom">
    <div class="tiny-text pad-0-4px">Request payload</div>
    <EditableCodeBlock v-model="request.data"/>
  </div>
  <div v-else-if="mustHaveParams" class="margin-bottom">
    <div class="tiny-text pad-0-4px">Request params</div>
    <EditableCodeBlock v-model="request.params"/>
  </div>
  <div v-else class="margin-bottom">
    <div class="tiny-text pad-0-4px">Additional</div>
    <EditableCodeBlock disabled />
  </div>
  <div class="flex-strip margin-bottom">
    <button>Run</button>
    <button>Run until this</button>
    <div class="spacer"></div>
    <button>X</button>
  </div>
  <div class="margin-bottom">
  </div>
</template>

<script>
import EditableCodeLine from "./EditableCodeLine.vue"
import EditableCodeBlock from "./EditableCodeBlock.vue"

export default {
  components: { 
    EditableCodeLine,
    EditableCodeBlock
  },
  props: {
    request: Object
  },
  computed: {
    mustHaveParams () {
      var m = this.request.method.toLowerCase()
      return m == 'get' || m == 'delete'
    },
    mustHavePayload () {
      var m = this.request.method.toLowerCase()
      return m == 'post' || m == 'put'
    }
  }
}
</script>
