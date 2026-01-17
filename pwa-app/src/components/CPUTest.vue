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
  <div class="benchmark-card inner-card">
    <form @submit.prevent="cpuTest" class="benchmark-form">
      <fieldset>
        <legend>N Queens Benchmark</legend>
        <label>
          n:
          <input type="number" v-model.number="n" min="1" />
        </label>
      </fieldset>
      <button type="submit" :disabled="loading">{{ loading ? 'Running...' : 'Run CPU Test' }}</button>
    </form>
    <div v-if="loading" class="notice">
      <span class="spinner"></span>
      Benchmark is running, please wait...
    </div>
    <div v-if="results && !loading">
      <Results :results="results"></Results>
    </div>
  </div>
</template>


