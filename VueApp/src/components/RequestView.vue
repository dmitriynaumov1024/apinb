<template>
  <div class="c-request-view margin-bottom"
    :class="{'c-request-view__active': active}"
    @keyup.ctrl.delete="() => { $emit('removeThis') }">
    <div class="flex-row margin-bottom">
      <div class="col-6">
        <div class="tiny-text">Method</div>
        <EditableCodeLine v-model="request.method" />
      </div>
      <div class="col-1"></div>
      <div class="col-23">
        <div class="tiny-text">URL</div>
        <EditableCodeLine v-model="request.url"/>
      </div>
    </div>
    <div v-if="mustHavePayload" class="margin-bottom">
      <div class="tiny-text">Request payload</div>
      <EditableCodeBlock v-model="request.data"/>
    </div>
    <div v-else-if="mustHaveParams" class="margin-bottom">
      <div class="tiny-text">Request params</div>
      <EditableCodeBlock v-model="request.params"/>
    </div>
    <div v-else class="margin-bottom">
      <div class="tiny-text">Additional</div>
      <EditableCodeBlock disabled />
    </div>
    <div class="c-request-view-toolbar">
      <button title="Run" @click="() => $emit('runThis')">
        <IconRun class="icon-2em" />
      </button>
      <button title="Run until this" @click="() => $emit('runUntilThis')">
        <IconRunUntilThis class="icon-2em" />
      </button>
      <button title="Clear logs" @click="() => $emit('clearLogs')">
        <IconClearLogs class="icon-2em" />
      </button>
    </div>
    <div v-if="request.logs" class="margin-bottom">
      <div class="tiny-text">Result</div>
      <pre class="plaincode tiny-text">{{request.logs}}</pre>
    </div>
  </div>
</template>

<script>
import EditableCodeLine from "./EditableCodeLine.vue"
import EditableCodeBlock from "./EditableCodeBlock.vue"
import IconRun from "./icons/Run.vue"
import IconRunUntilThis from "./icons/RunUntilThis.vue"
import IconClearLogs from "./icons/ClearLogs.vue"

export default {
  components: { 
    IconRun,
    IconRunUntilThis,
    IconClearLogs,
    EditableCodeLine,
    EditableCodeBlock
  },
  props: {
    request: Object,
    active: Boolean
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

<style scoped>
.c-request-view {
  background-color: var(--color-back-0);
  border: 2px solid var(--color-back-1);
  border-radius: 4px;
  padding: 4px 0.75rem 4px 2rem;
  transition: background-color 0.2s, border-color 0.2s;
  overflow: visible;
  --color-accent-sec: var(--color-back-2);
}

.c-request-view__active {
  border-color: var(--color-gray);
  box-shadow: 0 2px 8px rgba(120, 120, 120, 0.1);
  --color-accent-sec: var(--color-gray);
}

.c-request-view-toolbar {
  position: absolute;
  top: 0;
  left: -1rem;
  height: 100%;
  width: 2rem;
  z-index: 99;
  padding-top: 1rem;
}

.c-request-view-toolbar button {
  display: block;
  margin: 0.25rem auto 0;
  appearance: none;
  border: unset;
  padding: 0;
  line-height: 1;
  background: unset;
  cursor: pointer;
  transition: 0.2s;
}

</style>
