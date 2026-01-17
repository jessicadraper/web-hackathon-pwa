<script setup lang="ts">
const props = defineProps<{ message: string }>();
</script>

<template>
  <div>
    <h1>{{ props.message }}</h1>
  </div>
</template>

<style scoped>

</style>
