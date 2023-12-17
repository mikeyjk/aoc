import { AOCDay, InputType } from "../aocDay";
import { day5pt1 } from "../day5/day5";
import { Day6 } from "./day6";

test("day 5 part 1 sample", () => {
  const day6sample: AOCDay = new Day6("day6", InputType.sample);

  expect(day6sample.getPart1()).toStrictEqual({
    linePoints: 21,
    overlappingPoints: 5,
  });
});

test("day 5 part 2 sample", () => {
  const day6sample: AOCDay = new Day6("day6", InputType.sample);

  expect(day6sample.getPart2()).toStrictEqual({});
});

test("day 5 part 1", () => {
  const day6sample: AOCDay = new Day6("day6", InputType.input);

  expect(day6sample.getPart1()).toStrictEqual({
    linePoints: 104623,
    overlappingPoints: 7436,
  });
});

test("day 5 part 2", () => {
  const day6sample: AOCDay = new Day6("day6", InputType.input);

  expect(day6sample.getPart2()).toStrictEqual({});
});
