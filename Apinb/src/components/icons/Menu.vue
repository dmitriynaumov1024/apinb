<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
    <path v-if="active" d="M 11 11 L 39 39 M 11 39 L 39 11"  
      stroke="var(--color-gray)" stroke-width="3.5" />
    <path v-else d="M 10 12 L 40 12 M 10 25 L 40 25 M 10 38 L 40 38" 
      stroke="var(--color-gray)" stroke-width="3" />
  </svg>
</template>

<script>
export default {
  props: {
    active: Boolean
  }
}
</script>