<script setup lang="ts">
import { runNQueensBenchmark } from "../lib/nqueens";

function cpuTest() {
  console.log("Runing N-Queens!");
  runNQueensBenchmark();
}
</script>

<template>
  <div>
    <button @click="cpuTest">Run CPU Test</button>
  </div>
</template>

<style scoped></style>
