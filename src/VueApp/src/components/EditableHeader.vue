<template>
  <input type="text" :value="modelValue" 
    ref="input" maxlength="48"
    @change="() => { emitUpdate() }"/>
</template>

<script>
export default {
  props: ["modelValue"],
  methods: {
    emitUpdate() {
      this.$emit("update:modelValue", this.$refs["input"].value)
    }
  }
}
</script>

<style scoped>
input[type="text"] {
  resize: none;
  border: none;
  outline: none;
  display: block;
  overflow-y: hidden;
  width: 100%;
  padding: 0;
  line-height: inherit;
  font-family: inherit;
  color: var(--color-fore-0);
  background-color: transparent;
  transition: background-color 0.2s;
}

input[type="text"]:hover {
  background-color: var(--color-back-hover);
}

input[type="text"]:focus, input[type="text"]:active {
  background-color: var(--color-back-hover);
}
</style>
