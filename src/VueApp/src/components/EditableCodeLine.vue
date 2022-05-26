<template>
  <input type="text" :value="modelValue" ref="input"
    @keyup="() => { emitUpdate() }" 
    @change="() => { emitUpdate() }"
    class="code c-input pad-4px"/>
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
.c-input {
  color: var(--color-fore-0);
  appearance: none;
  outline: none;
  display: block;
  width: 100%;
  line-height: 1;
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
