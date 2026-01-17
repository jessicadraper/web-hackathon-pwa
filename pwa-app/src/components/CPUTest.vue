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

<style scoped>
.benchmark-card {
  max-width: 600px;
  margin: 2em auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 2em 2em 1.5em 2em;
}
.benchmark-card.inner-card {
  box-shadow: none;
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
}
.benchmark-form fieldset {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 1em;
  padding: 1em;
}
.benchmark-form label {
  display: inline-block;
  margin-right: 1.5em;
  margin-bottom: 0.5em;
}
.benchmark-form input[type="number"] {
  width: 70px;
  margin-left: 0.5em;
}
button {
  margin-bottom: 1em;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5em 1.2em;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.2s;
}
button:disabled {
  background: #aaa;
  cursor: not-allowed;
}
.notice {
  display: flex;
  align-items: center;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 6px;
  padding: 1em;
  margin: 1.5em 0;
  font-weight: 500;
  font-size: 1.1em;
}
.spinner {
  width: 22px;
  height: 22px;
  border: 3px solid #90caf9;
  border-top: 3px solid #1976d2;
  border-radius: 50%;
  margin-right: 1em;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
