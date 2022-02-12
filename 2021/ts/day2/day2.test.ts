import { calculateDepthPt1, calculateDepthPt2 } from "./day2";

test("day 2 part 1", () => {
  expect(calculateDepthPt1()).toStrictEqual({
    depth: 872,
    forward: 2003,
    product: 1746616,
  });
});

test("day 2 part 2", () => {
  expect(calculateDepthPt2()).toStrictEqual({
    depth: 869681,
    forward: 2003,
    product: 1741971043,
  });
});
