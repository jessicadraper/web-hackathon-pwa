<script setup lang="ts">
import Results from "./Results.vue";
import type { BenchmarkResult } from "../lib/benchmark";
import { runDBBenchmarks } from "../lib/db-benchmarks";
import { ref } from "vue";

const count = ref(1000);
const repeat = ref(1000);
const results = ref<BenchmarkResult[]>([]);
const loading = ref(false);

async function storageTest() {
  results.value = [];
  loading.value = true;
  results.value = await runDBBenchmarks(count.value, repeat.value);
  loading.value = false;
}
</script>

<template>
  <div class="benchmark-card inner-card">
    <form @submit.prevent="storageTest" class="benchmark-form">
      <fieldset>
        <legend>I/O DB Benchmark</legend>
        <label>
          Item Count:
          <input type="number" v-model.number="count" min="1" />
        </label>
        <label>
          Value Length:
          <input type="number" v-model.number="repeat" min="1" />
        </label>
      </fieldset>
      <button type="submit" :disabled="loading">{{ loading ? 'Running...' : 'Run Storage Test' }}</button>
    </form>
    <div v-if="loading" class="notice">
      <span class="spinner"></span>
      Benchmark is running, please wait...
    </div>
    <div v-if="results && !loading">
      <div v-for="result in results">
        <strong>{{ result.label }}</strong>
        <Results :results="result"></Results>
      </div>
    </div>
  </div>
</template>


