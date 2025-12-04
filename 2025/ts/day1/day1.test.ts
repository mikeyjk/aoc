import { readRotationInput } from "./day1";

const ScenarioRules = {
  minimumNumber: 0,
  maximumNumber: 99,
};

interface RotateInstruction {
  currentNumber: number;
  direction: "L" | "R";
  rotations: number;
}

interface RotationOutcome {
  resultantNumber: number;
  minimumNumberReached: number;
}

function rotate({
  currentNumber,
  direction,
  rotations,
}: RotateInstruction): number {
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

function rotateAndCountMin({
  currentNumber,
  direction,
  rotations,
}: RotateInstruction): RotationOutcome {
  let resultantNumber = currentNumber;
  let minimumNumberReached = 0;

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

    if (resultantNumber === 0) {
      minimumNumberReached++;
    }
  }

  return {
    resultantNumber,
    minimumNumberReached,
  };
}

test("day 1 part 1 (sample)", () => {
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

test("day 1 part 1", () => {
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

test("day 1 part 2", () => {
  const rotationInstructions = readRotationInput({ sample: false });

  let currentNumber = 50;
  let minimumReachedCounter = 0;

  rotationInstructions.forEach((instruction) => {
    let rotateAndMinCount = rotateAndCountMin({
      currentNumber: currentNumber,
      direction: instruction.direction,
      rotations: instruction.rotations,
    });

    currentNumber = rotateAndMinCount.resultantNumber;
    minimumReachedCounter += rotateAndMinCount.minimumNumberReached;
  });

  expect(minimumReachedCounter).toStrictEqual(6634);
});
