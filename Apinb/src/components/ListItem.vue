<template>
  <div class="c-list-item" 
    :class="{'c-active': active}">
      <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["active"]
}
</script>

<style scoped>
.c-list-item {
  border-radius: 4px;
  padding: 3px 8px;
  background-color: transparent;
  cursor: default;
  user-select: none;
}  

.c-list-item:hover {
  background-color: var(--color-back-hover);
}

.c-active {
  background-color: var(--color-back-active);
}

.c-active:hover {
  background-color: var(--color-back-active);
}
</style>
