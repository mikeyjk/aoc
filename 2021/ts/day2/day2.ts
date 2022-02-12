import * as fs from "fs";

enum SubmarineInstructionsEnum {
  FORWARD = "forward",
  UP = "up",
  DOWN = "down",
}

const rawInstructions: string[] = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .split("\n")
  .filter(Boolean);

export const calculateDepthPt1 = () => {
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
  return { forward, depth, product: forward * depth };
};

export const calculateDepthPt2 = () => {
  let forward = 0;
  let depth = 0;
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
  return { forward, depth, product: forward * depth };
};
