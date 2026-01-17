
<template>
  <div>
    <form @submit.prevent="runBenchmarks">
      <fieldset>
        <legend>Datenbank-Benchmark</legend>
        <label>
          count:
          <input type="number" v-model.number="dbCount" min="1" />
        </label>
        <label>
          repeat:
          <input type="number" v-model.number="dbRepeat" min="1" />
        </label>
        <label>
          runs:
          <input type="number" v-model.number="dbRuns" min="1" />
        </label>
      </fieldset>
      <fieldset>
        <legend>N-Queens-Benchmark</legend>
        <label>
          n:
          <input type="number" v-model.number="nqueensN" min="1" />
        </label>
        <label>
          runs:
          <input type="number" v-model.number="nqueensRuns" min="1" />
        </label>
      </fieldset>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Running...' : 'Run All Benchmarks' }}
      </button>
    </form>
    <div v-if="results">
      <button @click="downloadCSV" style="margin-bottom:1em">Export as CSV</button>
      <h3>Benchmark Report</h3>
      <div>
        <h4>Datenbank-Tests</h4>
        <div v-for="(entry, i) in results.db" :key="i">
          <strong>DB Test Run #{{ entry.run }} (count={{ entry.config.count }}, repeat={{ entry.config.repeat }}):</strong>
          <div>
            Write: <b>{{ entry.result[0]?.executionTimeMs?.toFixed(2) ?? '-' }} ms</b><br />
            Read: <b>{{ entry.result[1]?.executionTimeMs?.toFixed(2) ?? '-' }} ms</b>
          </div>
        </div>
      </div>
      <div>
        <h4>N-Queens-Tests</h4>
        <div v-for="(entry, i) in results.nqueens" :key="'nq' + i">
          <strong>N-Queens Test Run #{{ entry.run }} (n={{ entry.n }}):</strong>
          <div>
            <b>{{ entry.result?.executionTimeMs?.toFixed(2) ?? '-' }} ms</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { runAllBenchmarks, benchmarksToCSV } from '../lib/multi-benchmark'

const loading = ref(false)
const results = ref<any | null>(null)

// Eingabewerte für die Benchmarks
const dbCount = ref(1000)
const dbRepeat = ref(4)
const dbRuns = ref(1)
const nqueensN = ref(8)
const nqueensRuns = ref(1)

function downloadCSV() {
  if (!results.value) return;
  const csv = benchmarksToCSV(results.value);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  a.download = `benchmarks_${timestamp}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function runBenchmarks() {
  loading.value = true
  results.value = null // Report ausblenden, solange läuft
  results.value = await runAllBenchmarks({
    db: { count: dbCount.value, repeat: dbRepeat.value, runs: dbRuns.value },
    nqueens: { n: nqueensN.value, runs: nqueensRuns.value }
  })
  loading.value = false
}
</script>

<style scoped>
button {
  margin-bottom: 1em;
}
pre {
  background: #f4f4f4;
  padding: 0.5em;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
