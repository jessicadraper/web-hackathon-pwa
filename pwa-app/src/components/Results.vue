<script setup lang="ts">
import type { BenchmarkResult } from "../lib/benchmark";

const props = defineProps<{ results: BenchmarkResult }>();
props.results;
</script>

<template>
  <div>
    <table>
      <tr>
        <td>Execution Time:</td>
        <td>{{ props.results.executionTimeMs.toFixed(3) }} ms</td>
      </tr>
      <tr>
        <td>Memory Delta:</td>
        <td>{{ props.results.memoryDeltaMB }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>
