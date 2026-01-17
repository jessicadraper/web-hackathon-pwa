<script setup lang="ts">
import type { BenchmarkResult } from "../lib/benchmark";
import { runNQueensBenchmark } from "../lib/nqueens";
import { ref } from "vue";

const n = ref(15);
const results = ref<BenchmarkResult | null>(null);

async function cpuTest() {
  console.log(`Running ${n.value} Queens`);
  results.value = await runNQueensBenchmark(n.value);
}
</script>

<template>
  <div>
    <input type="number" v-model="n" /><br />
    <button @click="cpuTest">Run CPU Test</button>
  </div>
  <div v-if="results">
    <strong>Execution Time: {{ results.executionTimeMs }}</strong>
  </div>
</template>

<style scoped></style>
