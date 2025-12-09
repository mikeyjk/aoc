import * as fs from "fs";

type BatteryJoltage = string;

type BatteryBank = BatteryJoltage[];

export const readBatteryBanks = ({ sample = false }): BatteryBank[] => {
  const batteryBanks = fs
    .readFileSync(
      __dirname + (sample ? "/sample-input.txt" : "/input.txt"),
      "utf8"
    )
    .split("\n")
    .map((joltage: string) => joltage.split(""))
    .filter(Boolean);

  return batteryBanks;
};

interface Args {
  batteryBanks: BatteryBank[];
}

interface Response {
  joltageProducedPerBank: number[];
  joltageTotal: number;
}

export const findMaximumAttainableJoltageForTwo = ({
  batteryBanks,
}: Args): Response => {
  let joltageProduced: number[] = [];
  let runningJoltageTotal = 0;

  batteryBanks.forEach((bank, bankItr) => {
    let maximumAttainableJoltage = 0;

    bank.forEach((joltageX, xPos) => {
      bank.forEach((joltageY, yPos) => {
        // we always have to concatenate looking forward
        if (xPos === yPos || yPos < xPos) return;

        const attainableJoltage = Number(joltageX + joltageY);

        if (attainableJoltage > maximumAttainableJoltage) {
          maximumAttainableJoltage = attainableJoltage;
        }
      });
    });

    joltageProduced.push(maximumAttainableJoltage);
    runningJoltageTotal += maximumAttainableJoltage;
  });

  return {
    joltageProducedPerBank: joltageProduced,
    joltageTotal: runningJoltageTotal,
  };
};
