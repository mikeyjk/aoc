import { ProductIdRange, readProductIdRanges } from "./day2";

const sumInvalidRangesDueToSymmetricalNumber = (
  range: ProductIdRange
): number => {
  let invalidRangeSum = 0;

  // for each range, fill all the numbers
  for (let currentId = range.startId; currentId <= range.endId; currentId++) {
    if (isSymmetricalNumber(currentId)) {
      invalidRangeSum += currentId;
    }
  }
  return invalidRangeSum;
};

// lazy assumption - only need to check for patterns @ the start - maybe wrong?
const hasRepeatingNumberSequence = (
  number: number,
  debug: boolean = false
): boolean => {
  const currentIdString = number.toString();
  const firstNumber = currentIdString[0];
  let previousNumber = "";
  let numberSequence = "";
  let alternateSequence = "";

  // find the first pattern where the first number returns
  for (let i = 0; i < currentIdString.length; i++) {
    const currentNumber = currentIdString[i];

    if (i > 0 && currentNumber === firstNumber) {
      // the pattern has completed one iteration, or the pattern has multiple recurring
      if (debug) {
        console.log("one pattern ended", {
          numberSequence,
          currentNumber,
          currentIdString,
        });
      }

      if (currentNumber === previousNumber) {
        // we've got an immediate double up, store it, so our match check works
        numberSequence += currentNumber;
      } else {
        alternateSequence += currentNumber;
      }

      break; // only expecting 1 pattern
    } else {
      // we've yet to hit a repeating number, sequence is ongoing
      numberSequence += currentNumber;
    }

    previousNumber = currentNumber;
  }

  // fuck you regex
  // const regex = new RegExp(numberSequence, "g");
  // const repeatingNumbers = currentIdString.match(regex) || [];
  let lastFoundIndex = -1;
  let recentFoundIndex = -1;
  let matches = 0;
  let loopDetect = 0;

  do {
    loopDetect++;

    if (loopDetect > 1000) {
      console.log("fuk");
    }

    // if (currentIdString === "111") {
    //   console.log("cool");
    // }
    lastFoundIndex = recentFoundIndex;
    recentFoundIndex = currentIdString.indexOf(
      numberSequence,
      lastFoundIndex + 1
    );
    if (recentFoundIndex >= 0) {
      matches++;
    }
  } while (recentFoundIndex >= 0 && lastFoundIndex != recentFoundIndex);

  if (debug) {
    console.log("repeat check done", {
      numberSequence,
      currentIdString,
      matches,
      // repeatingNumbers,
      // repeatCount: repeatingNumbers.length,
    });
  }

  if (matches > 1) {
    return true;
  } else {
    return false;
  }
  // } else {
  //   return false;
  // }
};

const isSymmetricalNumber = (number: number): boolean => {
  const currentIdString = number.toString();
  const currentIdFirstHalf = currentIdString.slice(
    0,
    currentIdString.length / 2
  );
  const currentIdSecondHalf = currentIdString.slice(
    currentIdString.length / 2,
    currentIdString.length
  );

  if (currentIdFirstHalf === currentIdSecondHalf) {
    return true;
  }
  return false;
};

const sumInvalidRangesDueToSymmetricalAndRepeatingPatterns = (
  range: ProductIdRange
): number => {
  let invalidRangeSum = 0;
  let debug = false;
  let hasLoggedA = false;
  let hasLoggedB = false;
  let hasLoggedC = false;

  // for each range, fill all the numbers
  for (let currentId = range.startId; currentId <= range.endId; currentId++) {
    if (currentId === 1188511880 && !hasLoggedA) {
      // console.log("111");
      debug = true;
      hasLoggedA = true;
    } // else if (currentId === 999 && !hasLoggedB) {
    //   debug = true;
    //   hasLoggedB = true;
    // } else if (currentId === 1010 && !hasLoggedC) {
    //   debug = true;
    //   hasLoggedC = true;
    // } else {
    //   debug = false;
    // }
    if (isSymmetricalNumber(currentId)) {
      console.log("invalid id (symmetry)", { currentId });
      invalidRangeSum += currentId;
      if (debug) {
        console.log("is symmetrical", currentId);
      }
    } else if (hasRepeatingNumberSequence(currentId, debug)) {
      console.log("invalid id (repeat)", { currentId });
      invalidRangeSum += currentId;
    } else {
      if (debug) {
        console.log("not symmetrical, no repeating number", { currentId });
      }
    }
  }
  return invalidRangeSum;
};

test("day 1 part 1 (sample)", () => {
  const productIdRanges = readProductIdRanges({ sample: true });

  let invalidIdSum = 0;

  // find invalid IDs within ranges
  const sillyRanges = productIdRanges.forEach((range: ProductIdRange) => {
    invalidIdSum += sumInvalidRangesDueToSymmetricalNumber(range);
  });

  console.log({ invalidIdSum, productIdRanges });

  expect(invalidIdSum).toEqual(1227775554);
});

test("day 1 part 1", () => {
  const productIdRanges = readProductIdRanges({ sample: false });

  let invalidIdSum = 0;

  // find invalid IDs within ranges
  productIdRanges.forEach((range: ProductIdRange) => {
    // for each range, fill all the numbers
    for (let currentId = range.startId; currentId <= range.endId; currentId++) {
      invalidIdSum += sumInvalidRangesDueToSymmetricalNumber(range);
    }
  });

  console.log({ invalidIdSum, productIdRanges });

  expect(invalidIdSum).toEqual(23039913998);
});

test("day 1 part 2", () => {
  const productIdRanges = readProductIdRanges({ sample: true });

  let invalidIdSum = 0;

  // find invalid IDs within ranges
  productIdRanges.forEach((range: ProductIdRange) => {
    // for each range, fill all the numbers
    invalidIdSum += sumInvalidRangesDueToSymmetricalAndRepeatingPatterns(range);
  });

  console.log({ invalidIdSum, productIdRanges });

  expect(invalidIdSum).toEqual(4174379265);
});
