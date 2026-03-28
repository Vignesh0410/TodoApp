export function calcuteSum(N: number) {
  let sum = 0;
  for (let i = 1; i <= N; i++) {
    sum += i;
  }
  return sum;
}

process.on("message", (data) => {
  const result = calcuteSum((data as { number: number }).number);
  process.send!(result);
});
