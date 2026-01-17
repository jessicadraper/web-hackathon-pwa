<script setup lang="ts">
import CPUTest from "./components/CPUTest.vue";
import { runHeavyCalculationBenchmark } from "./lib/math";
import { runDBBenchmarks } from "./lib/db-benchmarks";
import StorageTest from "./components/StorageTest.vue";

runHeavyCalculationBenchmark();
runDBBenchmarks();
</script>
<template>
  <div>
    <h1>Hackathon App</h1>
    <h2>CPU Test</h2>
    <p>Run a CPU-bound function</p>
    <CPUTest></CPUTest>
    <h2>Storage Test</h2>
    <p>Run writes and reads</p>
    <StorageTest></StorageTest>
  </div>
</template>

<style scoped></style>
