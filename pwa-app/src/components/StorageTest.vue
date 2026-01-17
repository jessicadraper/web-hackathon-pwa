<script setup lang="ts">
import Results from "./Results.vue";
import type { BenchmarkResult } from "../lib/benchmark";
import { runDBBenchmarks } from "../lib/db-benchmarks";
import { ref } from "vue";

const results = ref<BenchmarkResult[]>([]);

async function storageTest() {
  results.value = await runDBBenchmarks();
}
</script>

<template>
  <div>
    <button @click="storageTest">Run Storage Test</button>
  </div>
  <div v-if="results" v-for="result in results">
    <strong>{{ result.label }}</strong>
    <Results :results="result"></Results>
  </div>
</template>

<style scoped></style>
