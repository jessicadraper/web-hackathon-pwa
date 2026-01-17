
<template>
  <div>
    <form @submit.prevent="runBenchmarks" class="benchmark-form">
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
    <div v-if="loading" class="notice">
      <span class="spinner"></span>
      Benchmarks are running, please wait...
    </div>
    <div v-if="results && !loading">
      <button @click="downloadCSV" class="csv-btn">Export as CSV</button>
      <h3>Benchmark Report</h3>
      <div>
        <h4>Datenbank-Tests</h4>
        <div v-for="(entry, i) in results.db" :key="i">
          <strong>DB Test Run #{{ entry.run }} (count={{ entry.config.count }}, repeat={{ entry.config.repeat }}):</strong>
          <div>
            Write: <b>{{ entry.writeMs !== undefined && entry.writeMs !== null ? entry.writeMs.toFixed(2) : '-' }} ms</b><br />
            Read: <b>{{ entry.readMs !== undefined && entry.readMs !== null ? entry.readMs.toFixed(2) : '-' }} ms</b>
          </div>
        </div>
      </div>
      <div>
        <h4>N-Queens-Tests</h4>
        <div v-for="(entry, i) in results.nqueens" :key="'nq' + i">
          <strong>N-Queens Test Run #{{ entry.run }} (n={{ entry.n }}):</strong>
          <div>
            <b>{{ entry.ms !== undefined && entry.ms !== null ? entry.ms.toFixed(2) : '-' }} ms</b>
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
  a.download = 'benchmarks.csv';
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
.benchmark-card {
  max-width: 600px;
  margin: 2em auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 2em 2em 1.5em 2em;
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
button, .csv-btn {
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
.csv-btn {
  margin-bottom: 1.5em;
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
/* Card-Styling wie gehabt */
.benchmark-card {
  max-width: 600px;
  margin: 2em auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 2em 2em 1.5em 2em;
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
button, .csv-btn {
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
.csv-btn {
  margin-bottom: 1.5em;
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
