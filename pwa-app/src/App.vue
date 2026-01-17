<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { runHeavyCalculationBenchmark } from './lib/math'

runHeavyCalculationBenchmark()

</script>
<template>
  <div>
    <h1>Hackathon App</h1>
    <HelloWorld message="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<style scoped>
</style>
