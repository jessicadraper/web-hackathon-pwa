<script setup lang="ts">
import CPUTest from "./components/CPUTest.vue";
import StorageTest from "./components/StorageTest.vue";
</script>
<template>
  <div>
    <h1>Hackathon PWA</h1>
    <div class="card">
      <h2>CPU Test</h2>
      <p>Run a CPU-bound function</p>
      <CPUTest></CPUTest>
    </div>
    <div class="card">
      <h2>I/O Storage Test</h2>
      <p>Run writes and reads</p>
      <StorageTest></StorageTest>
    </div>
  </div>
</template>

<style scoped></style>
