<script setup lang="ts">
import Results from "./Results.vue";
import type { BenchmarkResult } from "../lib/benchmark";
import { runDBBenchmarks } from "../lib/db-benchmarks";
import { ref } from "vue";

const count = ref(1000);
const repeat = ref(1);
const results = ref<BenchmarkResult[]>([]);

async function storageTest() {
  results.value = await runDBBenchmarks(count.value, repeat.value);
}
</script>

<template>
  <div>
    <label>Item Count</label>
    <input type="number" v-model="count" /><br />
    <label>Value Length</label>
    <input type="number" v-model="repeat" /><br />
    <button @click="storageTest">Run Storage Test</button>
  </div>
  <div v-if="results" v-for="result in results">
    <strong>{{ result.label }}</strong>
    <Results :results="result"></Results>
  </div>
</template>

<style scoped></style>
