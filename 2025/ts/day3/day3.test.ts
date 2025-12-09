import { findMaximumAttainableJoltageForTwo, readBatteryBanks } from "./day3";

describe("day 3 part 1", () => {
  test("sample", () => {
    const batteryBanks = readBatteryBanks({ sample: true });

    const { joltageTotal, joltageProducedPerBank } =
      findMaximumAttainableJoltageForTwo({ batteryBanks });

    console.log({ batteryBanks, joltageProducedPerBank, joltageTotal });

    expect(joltageTotal).toEqual(357);
  });

  test("real", () => {
    const batteryBanks = readBatteryBanks({ sample: false });

    const { joltageTotal, joltageProducedPerBank } =
      findMaximumAttainableJoltageForTwo({ batteryBanks });

    console.log({ batteryBanks, joltageProducedPerBank, joltageTotal });

    expect(joltageTotal).toEqual(17278);
  });
});

describe("day 3 part 2", () => {
  test("sample", () => {
    // const productIdRanges = readProductIdRanges({ sample: true });
    // expect(invalidIdSum).toEqual(4174379265);
  });

  test("real", () => {
    // const productIdRanges = readProductIdRanges({ sample: false });
    // expect(invalidIdSum).toEqual(35950619148);
  });
});
