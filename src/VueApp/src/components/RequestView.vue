<template>
  <div class="c-request-view margin-bottom"
    :class="{'c-request-view__active': active}">
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
      <button title="Run">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 50 50" class="icon-2em">
          <circle cx="25" cy="25" r="23" 
            fill="var(--color-accent)" 
            stroke="var(--color-back)" stroke-width="4" />
          <path fill="var(--color-back)" d="M 19 16 L 19 34 L 36 25 L 19 16 Z"/>
        </svg>
      </button>
      <button title="Run until this">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 50 50" class="icon-2em">
          <circle cx="25" cy="25" r="25"
            fill="var(--color-back)" />
          <circle cx="25" cy="25" r="20"
            stroke="var(--color-accent-sec)" fill="none" stroke-width="3" />
          <path d="M 15 19 L 15 31 L 24 25 L 15 19 Z"
            stroke="var(--color-accent-sec)" fill="none" stroke-width="3"/>
          <path d="M 25 19 L 25 31 L 34 25 L 25 19 Z"
            stroke="var(--color-accent-sec)" fill="none" stroke-width="3"/>
          <path d="M 36 17 L 36 33 Z"
            stroke="var(--color-accent-sec)" fill="none" stroke-width="4"/>
        </svg>
      </button>
      <button title="Clear logs">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 50 50" class="icon-2em">
          <circle cx="25" cy="25" r="25"
            fill="var(--color-back)" />
          <circle cx="25" cy="25" r="20"
            stroke="var(--color-accent-sec)" fill="none" stroke-width="3" />
          <path d="M 18 18 L 32 32 M 18 32 L 32 18 Z"
            stroke="var(--color-accent-sec)" fill="none" stroke-width="3"/>
        </svg>
      </button>
    </div>
    <div v-if="request.logs" class="margin-bottom">
      <code block><pre>{{request.logs}}</pre></code>
    </div>
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
  border: 2px solid var(--color-back-2);
  padding: 4px 0.75rem 4px 2rem;
  transition: background-color 0.2s, border-color 0.2s;
  margin-left: 1rem;
  overflow: visible;
  --color-accent-sec: var(--color-back-3);
}

.c-request-view__active {
  border-color: var(--color-accent);
  --color-accent-sec: var(--color-accent);
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
}

</style>
