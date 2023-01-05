<template>
  <input type="text" :value="modelValue" ref="input"
    @change="() => { emitUpdate() }"
    class="plaincode c-input"/>
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
  outline: none;
  border: none;
  background-color: unset;
  padding: 4px 0px;
}

.c-input {
  color: var(--color-fore-0);
  appearance: none;
  outline: none;
  display: block;
  width: 100%;
  line-height: 1;
  transition: background-color 0.2s, border-color 0.2s;
}

.c-input:focus {
  background-color: var(--color-back-active);
  box-shadow: inset 0 -2px var(--color-accent-active);
}
</style>
