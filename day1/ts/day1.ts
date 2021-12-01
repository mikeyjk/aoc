import * as fs from "fs";

const depthInputs: number[] = fs
  .readFileSync("../input.txt", "utf8")
  .split("\n")
  .map((v: string) => parseInt(v));

let depthIncreaseCount: number = 0;

for (let i = 0; i < depthInputs.length - 2; i++) {
  const depthDifference: number = depthInputs[i + 1] - depthInputs[i];

  if (depthDifference > 0) {
    depthIncreaseCount++;
  }
}

console.log({ depthIncreaseCount });
