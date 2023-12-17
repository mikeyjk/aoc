import { day3 } from "./day3";

test("day 3 part 1 & 2", () => {
  expect(day3()).toStrictEqual({
    c02ScrubberRate: 1471,
    c02ScrubberSequence: [[0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
    epsilonRate: 2921,
    epsilonSequence: [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1],
    gammaRate: 1174,
    gammaSquence: [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0],
    lifeSupportRating: 5410338,
    oxygenGeneratorRate: 3678,
    oxygenGeneratorSequence: [[1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0]],
    powerConsumption: 3429254,
  });
});
