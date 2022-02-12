import { day3 } from "./day3";

test("day 3 part 1", () => {
  expect(day3()).toStrictEqual({
    depth: 872,
    forward: 2003,
    product: 1746616,
  });
});
