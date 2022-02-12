import { calculateDepthIncreasePt1, calculateDepthIncreasePt2 } from "./day1";

test("day 1 part 1", () => {
  expect(calculateDepthIncreasePt1()).toBe(1557);
});

test("day 1 part 2", () => {
  expect(calculateDepthIncreasePt2()).toBe(1608);
});
