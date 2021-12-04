import * as fs from "fs";

const binarySequences: number[][] = [];

// the input contains binary sequences that are transposed
// i.e. each row is not a sequence, but the first bit in a sequence
fs.readFileSync("../input.txt", "utf8")
  .split("\n")
  .filter(Boolean) // ignore EOF line
  .map((line) => line.split(""))
  .map((binaryDigitRow, rowNum) => {
    binaryDigitRow.forEach((digit, colNum) => {
      binarySequences[colNum] = binarySequences[colNum] || [];
      binarySequences[colNum][rowNum] = parseInt(digit);
    });
  });

const gammaSquence: number[] = binarySequences.reduce(
  (prevSequence, currSequence, index) => {
    const sequenceLength = currSequence.length;
    prevSequence[index] =
      currSequence.filter(Boolean).length > sequenceLength / 2 ? 1 : 0;
    return prevSequence;
  },
  []
);

const epsilonSequence: number[] = gammaSquence.map((b) => (b == 1 ? 0 : 1));
const gammaRate: number = parseInt(gammaSquence.join(""), 2);
const epsilonRate: number = parseInt(epsilonSequence.join(""), 2);

console.log({
  gammaSquence,
  epsilonSequence,
  gammaRate,
  epsilonRate,
  powerConsumption: gammaRate * epsilonRate,
});

// .filter(Boolean)
// .map((binaryString) => binaryString.split("").map((b) => parseInt(b)));

// console.log({ wat });
// // tracking how many columns have a '1'
// let columnSum: number[] = [];

// // cool functional way instead?
// for (let x = 0; x < binaryArray[0].length; x++) {
//   columnSum[x] = 0;
//   for (let y = 0; y < binaryArray.length; y++) {
//     columnSum[x] += binaryArray[y][x] == 1 ? 1 : 0;
//   }
// }

// console.log({ columnSum, binaryArray });
