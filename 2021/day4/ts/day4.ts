import * as fs from "fs";

const input: string[] = fs
  .readFileSync("../sample-input.txt", "utf8")
  .split("\n");

const bingoNumbers = input
  .shift()
  .split(",")
  .map((stringNumber) => parseInt(stringNumber));

// read board numbers into array without hardcoding 5x5
let boardCount = -1;
const boardNumbers = input
  .map((line) => line.split(" ").filter(Boolean))
  .reduce<number[][]>((prev, current, index) => {
    if (current.length === 0) {
      boardCount++;
    } else {
      prev = prev || [];
      prev[boardCount] = prev[boardCount] || [];
      prev[boardCount].push(...current.map((c) => parseInt(c)));
    }
    return prev;
  }, []);

console.log({ input, bingoNumbers, boardNumbers });
