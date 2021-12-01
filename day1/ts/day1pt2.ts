import * as fs from "fs";

const depthInputs: number[] = fs
  .readFileSync("../input.txt", "utf8")
  .split("\n")
  .map((v: string) => parseInt(v));

const depthInputLength: number = depthInputs.length - 3;

let previousWindowSum: number = 0;

let depthIncreaseCount: number = 0;

for (let i = 0; i < depthInputLength; i++) {
  const windowSum: number =
    depthInputs[i + 2] + depthInputs[i + 1] + depthInputs[i];

  if (i != 0 && windowSum > previousWindowSum) {
    depthIncreaseCount++;
  }

  previousWindowSum = windowSum;
}

console.log({ depthIncreaseCount });
