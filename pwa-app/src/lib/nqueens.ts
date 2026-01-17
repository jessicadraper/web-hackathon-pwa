import { measureOperation } from "./benchmark.ts";

export function solveNQueens(n: number) {
  let solutions = 0;
  const all = (1 << n) - 1;

  function backtrack(columns: number, diag1: number, diag2: number) {
    if (columns === all) {
      solutions++;
      return;
    }

    let available = ~(columns | diag1 | diag2) & all;

    while (available !== 0) {
      const position = available & -available;
      available -= position;

      backtrack(
        columns | position,
        (diag1 | position) << 1,
        (diag2 | position) >> 1,
      );
    }
  }

  backtrack(0, 0, 0);
  return solutions;
}

export async function runNQueensBenchmark() {
  const result = await measureOperation("N Queens", () => solveNQueens(15));
  console.log(result);
  return result;
}
