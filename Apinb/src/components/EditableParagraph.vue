<template>
  <textarea :value="modelValue" ref="input" 
    spellcheck="false" 
    @input="() => { autoSize() }" 
    @change="() => { autoSize(); emitUpdate() }">
  </textarea>
</template>

<script>
export default {
  props: ["modelValue"],
  methods: {
    autoSize() {
      var el = this.$refs["input"]
      el.style.height = "1px" 
      el.style.height = el.scrollHeight + 26 + "px"
    },
    emitUpdate() {
      this.$emit("update:modelValue", this.$refs["input"].value)
    }
  },
  mounted () {
    this.autoSize()
  },
  updated () {
    this.autoSize()
  }
}
</script>

<style scoped>
textarea {
  resize: none;
  border: none;
  outline: none;
  display: block;
  overflow-y: hidden;
  height: 1em;
  width: 100%;
  margin: 4px auto 4px;
  padding: 0;
  font-size: 1rem;
  line-height: inherit;
  font-family: inherit;
  color: var(--color-fore-0);
  background-color: transparent;
  transition: background-color 0.2s;
}

textarea:hover {
  background-color: var(--color-back-hover);
}

textarea:focus, textarea:active {
  background-color: var(--color-back-hover);
}
</style>
