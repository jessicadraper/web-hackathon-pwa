
import { measureOperation } from './benchmark.ts'

export function heavyCalculation(iterations: number): number {
  let sum = 0
  for (let i = 1; i <= iterations; i++) {
    sum += Math.sqrt(i) * Math.sin(i)
  }
  return sum
}

export async function runHeavyCalculationBenchmark() {
  const result = await measureOperation('Heavy Calc 5M', () => heavyCalculation(5_000_000))
  console.log(result)
  return result
}
