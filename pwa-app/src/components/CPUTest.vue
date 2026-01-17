<script setup lang="ts">
import Results from "./Results.vue";
import type { BenchmarkResult } from "../lib/benchmark";
import { runNQueensBenchmark } from "../lib/nqueens";
import { ref } from "vue";

const n = ref(15);
const results = ref<BenchmarkResult | null>(null);
const loading = ref(false);

async function cpuTest() {
  console.log(`Running ${n.value} Queens`);
  results.value = null;
  loading.value = true;
  results.value = await runNQueensBenchmark(n.value);
  loading.value = false;
}
</script>

<template>
  <div>
    <div class="field">
      <label>N Queens</label>
      <input type="number" v-model="n" /><br />
    </div>
    <button @click="cpuTest">Run CPU Test</button>
  </div>
  <div v-if="loading">Running...</div>
  <div v-if="results">
    <Results :results="results"></Results>
  </div>
</template>

<style scoped></style>
