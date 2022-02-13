import { day4 } from "./day4";

test("day 4 part 1 & 2", () => {
  expect(day4()).toStrictEqual({
    bingoNumbers: [
      93, 35, 66, 15, 6, 51, 49, 67, 16, 77, 80, 8, 1, 57, 99, 92, 14, 9, 13,
      23, 33, 11, 43, 50, 60, 96, 40, 25, 22, 39, 56, 18, 2, 7, 34, 68, 26, 90,
      75, 41, 4, 95, 71, 30, 42, 5, 46, 55, 27, 98, 79, 12, 65, 73, 29, 28, 17,
      48, 81, 32, 59, 63, 85, 91, 52, 21, 38, 31, 61, 83, 97, 62, 44, 70, 19,
      69, 36, 47, 74, 58, 78, 24, 72, 0, 10, 88, 37, 87, 3, 45, 82, 76, 54, 84,
      20, 94, 86, 53, 64, 89,
    ],
    firstWinner: {
      winningNumber: 39,
      winningSequence: [35, 50, 9, 39, 43],
      sequenceType: "row",
      boardNumber: 93,
      unmarkedNumbers: [
        29, 26, 19, 12, 88, 42, 95, 63, 78, 21, 53, 10, 46, 24, 87,
      ],
    },
    lastWinner: {
      winningNumber: 87,
      winningSequence: [87, 14, 31, 5, 56],
      sequenceType: "column",
      boardNumber: 21,
      unmarkedNumbers: [20, 84, 54, 64, 76, 45, 82],
    },
    firstUnmarkedNumberSum: 693,
    lastUnmarkedNumberSum: 425,
    firstScore: 27027, // pt1
    lastScore: 36975, // pt2
  });
});
