// Exportiert die Benchmark-Ergebnisse als CSV-String
export function benchmarksToCSV(results: any): string {
  let csv = 'type;run;config;ms\n';
  if (results.db) {
    results.db.forEach((entry: any) => {
      csv += `db_write;${entry.run};count=${entry.config.count}|repeat=${entry.config.repeat};${entry.writeMs ?? ''}\n`;
      csv += `db_read;${entry.run};count=${entry.config.count}|repeat=${entry.config.repeat};${entry.readMs ?? ''}\n`;
    });
  }
  if (results.nqueens) {
    results.nqueens.forEach((entry: any) => {
      csv += `nqueens;${entry.run};n=${entry.n};${entry.ms ?? ''}\n`;
    });
  }
  return csv;
}
// multi-benchmark.ts
import { runDBBenchmarks } from './db-benchmarks'
import { runNQueensBenchmark } from './nqueens'

type MultiBenchmarkConfig = {
  db?: { count: number, repeat: number, runs: number },
  nqueens?: { n: number, runs: number }
}

export async function runAllBenchmarks(config: MultiBenchmarkConfig = {
  db: { count: 1000, repeat: 4, runs: 1 },
  nqueens: { n: 8, runs: 1 }
}) {
  const results: any = {}

  // DB Benchmarks mit Warm-up
  results.db = []
  if (config.db) {
    console.log('DB Benchmark: 3x Warm-up...')
    for (let w = 0; w < 3; w++) {
      await runDBBenchmarks(config.db.count, config.db.repeat)
    }
    for (let i = 0; i < config.db.runs; i++) {
      console.log(`DB Benchmark Run ${i+1}: count=${config.db.count}, repeat=${config.db.repeat}`)
      const res = await runDBBenchmarks(config.db.count, config.db.repeat)
      // Nur die Millisekunden speichern
      results.db.push({
        run: i+1,
        config: config.db,
        writeMs: res[0]?.executionTimeMs ?? null,
        readMs: res[1]?.executionTimeMs ?? null
      })
    }
  }

  // N-Queens Benchmarks mit Warm-up
  results.nqueens = []
  if (config.nqueens) {
    console.log('N-Queens Benchmark: 3x Warm-up...')
    for (let w = 0; w < 3; w++) {
      await runNQueensBenchmark(config.nqueens.n)
    }
    for (let i = 0; i < config.nqueens.runs; i++) {
      console.log(`N-Queens Benchmark Run ${i+1}: n=${config.nqueens.n}`)
      const nqResult = await runNQueensBenchmark(config.nqueens.n)
      results.nqueens.push({
        run: i+1,
        n: config.nqueens.n,
        ms: nqResult?.executionTimeMs ?? null
      })
    }
  }

  // Report
  console.log('--- BENCHMARK REPORT ---')
  results.db.forEach((entry: any) => {
    console.log(`DB Test Run #${entry.run} (count=${entry.config.count}, repeat=${entry.config.repeat}): Write: ${entry.writeMs} ms, Read: ${entry.readMs} ms`)
  })
  results.nqueens.forEach((entry: any) => {
    console.log(`N-Queens Test Run #${entry.run} (n=${entry.n}): ${entry.ms} ms`)
  })

  return results
}

