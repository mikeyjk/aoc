import * as fs from "fs";

const readDepthInputs = () =>
  fs
    .readFileSync(__dirname + "/input.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((v: string) => parseInt(v));

export const calculateDepthIncreasePt1 = (): number => {
  const depthInputs: number[] = readDepthInputs();

  let depthIncreaseCount: number = 0;

  for (let i = 0; i < depthInputs.length - 1; i++) {
    const depthDifference: number = depthInputs[i + 1] - depthInputs[i];

    if (depthDifference > 0) {
      depthIncreaseCount++;
    }
  }

  console.log({ depthIncreaseCount });

  return depthIncreaseCount;
};

export const calculateDepthIncreasePt2 = (): number => {
  const depthInputs: number[] = readDepthInputs();

  let depthIncreaseCount: number = 0;
  const depthInputLength: number = depthInputs.length - 2;
  let previousWindowSum: number = 0;
  depthIncreaseCount = 0;

  for (let i = 0; i < depthInputLength; i++) {
    const windowSum: number =
      depthInputs[i + 2] + depthInputs[i + 1] + depthInputs[i];

    if (i != 0 && windowSum > previousWindowSum) {
      depthIncreaseCount++;
    }

    previousWindowSum = windowSum;
  }

  console.log({ depthIncreaseCount });

  return depthIncreaseCount;
};
