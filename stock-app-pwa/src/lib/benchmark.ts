// benchmark.ts
export interface BenchmarkResult<T = unknown> {
  label: string
  executionTimeMs: number
  memoryDeltaMB: number | null
  result: T
}

export interface BenchmarkOptions {
  measureMemory?: boolean
}

/**
 * Runs an operation and measures how long it takes and, optionally, the JS heap memory used.
 * @param label Name of the operation
 * @param operation A function or async function to measure
 * @param options Options, e.g. measureMemory
 * @returns BenchmarkResult with execution time, memory change, and result
 */
export async function measureOperation<T>(
  label: string,
  operation: () => T | Promise<T>,
  options: BenchmarkOptions = { measureMemory: true }
): Promise<BenchmarkResult<T>> {
  // Small pause to reduce possible main thread garbage collection effects
  await new Promise(r => setTimeout(r, 0))

  const hasMemory = (performance as any).memory !== undefined && options.measureMemory

  const memoryBefore = hasMemory ? (performance as any).memory.usedJSHeapSize : null

  const start = performance.now()
  const result = await operation()
  const end = performance.now()

  const memoryAfter = hasMemory ? (performance as any).memory.usedJSHeapSize : null

  return {
    label,
    executionTimeMs: end - start,
    memoryDeltaMB: hasMemory && memoryBefore !== null && memoryAfter !== null
      ? (memoryAfter - memoryBefore) / 1024 / 1024
      : null,
    result
  }
}

/**
 * Runs an operation multiple times and returns all results
 */
export async function runMultiple<T>(
  label: string,
  operation: () => T | Promise<T>,
  runs: number = 20,
  options: BenchmarkOptions = { measureMemory: true }
): Promise<BenchmarkResult<T>[]> {
  const results: BenchmarkResult<T>[] = []
  for (let i = 0; i < runs; i++) {
    results.push(await measureOperation(`${label} #${i + 1}`, operation, options))
  }
  return results
}
