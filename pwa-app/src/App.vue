<script setup lang="ts">
import CPUTest from "./components/CPUTest.vue";
import { runHeavyCalculationBenchmark } from "./lib/math";
import { runDBBenchmarks } from "./lib/db-benchmarks";

runHeavyCalculationBenchmark();
runDBBenchmarks();
</script>
<template>
  <div>
    <h1>Hackathon App</h1>
    <h2>CPU Test</h2>
    <p>Run a CPU-bound function</p>
    <CPUTest></CPUTest>
  </div>
</template>

<style scoped></style>
