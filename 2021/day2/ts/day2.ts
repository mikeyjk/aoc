import * as fs from "fs";

enum SubmarineInstructionsEnum {
  FORWARD = "forward",
  UP = "up",
  DOWN = "down",
}

const rawInstructions: string[] = fs
  .readFileSync("../input.txt", "utf8")
  .split("\n")
  .filter(Boolean);

let forward: number = 0;
let depth: number = 0;

rawInstructions.map((i) => {
  const rawInstruction: string[] = i.split(/\s/);
  const instruction: string = rawInstruction[0];
  const value: number = parseInt(rawInstruction[1]);

  switch (instruction) {
    case SubmarineInstructionsEnum.FORWARD:
      forward += value;
      break;
    case SubmarineInstructionsEnum.UP:
      depth -= value;
      break;
    case SubmarineInstructionsEnum.DOWN:
      depth += value;
      break;
    default:
      break;
  }
});

console.log({ forward, depth, product: forward * depth });

forward = 0;
depth = 0;
let aim: number = 0;

rawInstructions.map((i) => {
  const rawInstruction: string[] = i.split(/\s/);
  const instruction: string = rawInstruction[0];
  const value: number = parseInt(rawInstruction[1]);

  switch (instruction) {
    case SubmarineInstructionsEnum.FORWARD:
      forward += value;
      depth += aim * value;
      break;
    case SubmarineInstructionsEnum.UP:
      aim -= value;
      break;
    case SubmarineInstructionsEnum.DOWN:
      aim += value;
      break;
    default:
      break;
  }
});

console.log({ forward, depth, product: forward * depth });
