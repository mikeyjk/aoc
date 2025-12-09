import {
  ProductIdRange,
  readProductIdRanges,
  sumInvalidRangesDueToSymmetricalAndRepeatingPatterns,
  sumInvalidRangesDueToSymmetricalNumber,
} from "./day2";

describe("day 2 part 1", () => {
  test("sample", () => {
    const productIdRanges = readProductIdRanges({ sample: true });

    let invalidIdSum = 0;

    // find invalid IDs within ranges
    productIdRanges.forEach((range: ProductIdRange) => {
      invalidIdSum += sumInvalidRangesDueToSymmetricalNumber(range);
    });

    console.log({ invalidIdSum, productIdRanges });

    expect(invalidIdSum).toEqual(1227775554);
  });

  test("real", () => {
    const productIdRanges = readProductIdRanges({ sample: false });

    let invalidIdSum = 0;

    // find invalid IDs within ranges
    productIdRanges.forEach((range: ProductIdRange) => {
      invalidIdSum += sumInvalidRangesDueToSymmetricalNumber(range);
    });

    console.log({ invalidIdSum, productIdRanges });

    expect(invalidIdSum).toEqual(23039913998);
  });
});

describe("day 2 part 2", () => {
  test("sample", () => {
    const productIdRanges = readProductIdRanges({ sample: true });

    let invalidIdSum = 0;

    // find invalid IDs within ranges
    productIdRanges.forEach((range: ProductIdRange) => {
      // for each range, fill all the numbers
      invalidIdSum +=
        sumInvalidRangesDueToSymmetricalAndRepeatingPatterns(range);
    });

    console.log({
      invalidIdSum,
      rangeCount: productIdRanges.length,
      productIdRanges,
    });

    expect(invalidIdSum).toEqual(4174379265);
  });

  test("real", () => {
    const productIdRanges = readProductIdRanges({ sample: false });

    let invalidIdSum = 0;

    // find invalid IDs within ranges
    productIdRanges.forEach((range: ProductIdRange) => {
      // for each range, fill all the numbers
      invalidIdSum +=
        sumInvalidRangesDueToSymmetricalAndRepeatingPatterns(range);
    });

    console.log({
      invalidIdSum,
      rangeCount: productIdRanges.length,
      productIdRanges,
    });

    expect(invalidIdSum).toEqual(35950619148);
  });
});
