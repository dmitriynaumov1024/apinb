<template>
  <textarea :value="modelValue" ref="input" 
    spellcheck="false" 
    @input="() => { autoSize() }" 
    @change="() => { autoSize(); emitUpdate() }" 
    class="plaincode c-input">
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
  appearance: none;
  border: none;
  outline: none;
  display: block;
  background-color: unset;
  width: 100%;
  resize: none;
  padding: 4px 0px;
}

.c-input {
  color: var(--color-fore-0);
  line-height: inherit;
  transition: background-color 0.2s, border-color 0.2s;
}

.c-input:focus {
  background-color: var(--color-back-active);
  box-shadow: inset 0 -2px var(--color-accent-active);
}
</style>
