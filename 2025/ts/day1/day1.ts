import * as fs from "fs";

type RotationRow = {
  direction: "L" | "R";
  rotations: number;
};

interface ReadInput {
  sample?: boolean;
}

export const readRotationInput = ({ sample = false }: ReadInput) =>
  fs
    .readFileSync(
      __dirname + (sample ? "/sample-input.txt" : "/input.txt"),
      "utf8"
    )
    .split("\n")
    .filter(Boolean)
    .map((input: string): RotationRow => {
      const direction = input.slice(0, 1);
      const rotations = Number(input.slice(1));

      if (direction !== "R" && direction !== "L") {
        return undefined;
      }

      return {
        direction,
        rotations,
      };
    })
    .filter(Boolean);
