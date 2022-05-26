<template>
  <textarea :value="modelValue" ref="input" 
    @keyup="() => { autoSize(); emitUpdate() }" 
    @change="() => { autoSize(); emitUpdate() }" 
    class="code c-input">
  </textarea>
</template>

<script>
export default {
  props: ["modelValue"],
  methods: {
    autoSize() {
      var el = this.$refs["input"]
      el.style.height = "1px" 
      el.style.height = el.scrollHeight + 32 + "px"
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
.c-input {
  color: var(--color-fore-0);
  appearance: none;
  outline: none;
  display: block;
  width: 100%;
  resize: none;
  line-height: inherit;
  transition: background-color 0.2s, border-color 0.2s;
  background-color: var(--color-back-1);
}

.c-input:hover {
  background-color: var(--color-back-hover);
}

.c-input:focus, .c-input:active {
  background-color: var(--color-back-hover);
  border-color: var(--color-accent-hover);
}
</style>
