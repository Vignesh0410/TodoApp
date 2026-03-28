function calculateSum(N: number): number {
  let sum = 0;
  for (let i = 1; i <= N; i++) {
    sum += i;
  }
  return sum;
}

import { parentPort } from "worker_threads";

parentPort?.on("message", (number: number) => {
     console.log("tye ", typeof number);
  const sum = calculateSum(number);
  parentPort?.postMessage(sum);
});
