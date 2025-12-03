import { readRotationInput } from "./day1";

const ScenarioRules = {
  minimumNumber: 0,
  maximumNumber: 99,
};

interface Rotate {
  currentNumber: number;
  direction: "L" | "R";
  rotations: number;
}

function rotate({ currentNumber, direction, rotations }: Rotate): number {
  let resultantNumber = currentNumber;

  for (let i = 0; i < rotations; i++) {
    if (direction === "L") {
      resultantNumber--;

      if (resultantNumber < ScenarioRules.minimumNumber) {
        resultantNumber = ScenarioRules.maximumNumber;
      }
    } else if (direction === "R") {
      resultantNumber++;

      if (resultantNumber > ScenarioRules.maximumNumber) {
        resultantNumber = ScenarioRules.minimumNumber;
      }
    } else {
      console.error("bad input", { currentNumber, direction, rotations });
    }
  }

  return resultantNumber;
}

test("day 1 part 1", () => {
  const rotationInstructions = readRotationInput({ sample: true });

  let currentNumber = 50;
  let minimumReachedCounter = 0;

  rotationInstructions.forEach((instruction) => {
    let rotatedNumber = rotate({
      currentNumber: currentNumber,
      direction: instruction.direction,
      rotations: instruction.rotations,
    });

    currentNumber = rotatedNumber;
    minimumReachedCounter += rotatedNumber === 0 ? 1 : 0;
  });

  expect(minimumReachedCounter).toStrictEqual(3);
});

test("day 1 part 2", () => {
  const rotationInstructions = readRotationInput({ sample: false });

  let currentNumber = 50;
  let minimumReachedCounter = 0;

  rotationInstructions.forEach((instruction) => {
    let rotatedNumber = rotate({
      currentNumber: currentNumber,
      direction: instruction.direction,
      rotations: instruction.rotations,
    });

    currentNumber = rotatedNumber;
    minimumReachedCounter += rotatedNumber === 0 ? 1 : 0;
  });

  expect(minimumReachedCounter).toStrictEqual(1141);
});
