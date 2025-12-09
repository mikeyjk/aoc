import * as fs from "fs";
import { start } from "repl";

export type ProductIdRange = {
  startId: number;
  endId: number;
};

export type ProductIdRangeWithInvalidEntries = ProductIdRange & {
  invalidIds: number[];
};

interface ReadInput {
  sample?: boolean;
}

export const readProductIdRanges = ({ sample = false }: ReadInput) =>
  fs
    .readFileSync(
      __dirname + (sample ? "/sample-input.txt" : "/input.txt"),
      "utf8"
    )
    .split(",")
    .filter(Boolean)
    .map((input: string): ProductIdRange => {
      const productIdRange = input.split("-");

      if (!productIdRange[0] || !productIdRange[1]) {
        console.warn("Invalid range data", { input, productIdRange });
        return undefined;
      }

      const startRange = productIdRange[0];
      const endRange = productIdRange[1];

      if (startRange === "101" || endRange === "101") {
        console.warn("ID we should ignore", { input, startRange, endRange });
        return undefined;
      }

      return {
        startId: Number(productIdRange[0]),
        endId: Number(productIdRange[1]),
      };
    })
    .filter(Boolean);

export const sumInvalidRangesDueToSymmetricalNumber = (
  range: ProductIdRange
): number => {
  let invalidRangeSum = 0;

  // for each range, fill all the numbers
  for (let currentId = range.startId; currentId <= range.endId; currentId++) {
    if (isEvenSymmetricalNumber(currentId)) {
      invalidRangeSum += currentId;
    }
  }
  return invalidRangeSum;
};

// ez, rip it in half then compare it
export const isEvenSymmetricalNumber = (number: number): boolean => {
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

export const areAllDigitsIdentical = (numberString: string): boolean => {
  numberString.matchAll;
  return numberString.split(numberString[0]).length === numberString.length + 1;
};

// still ez, but not as ez, rip it into chunks when we find evenly divisible chunks
export const isOddSymmetricalNumber = (number: number): boolean => {
  const currentIdString = number.toString();
  const currentIdLength = currentIdString.length;
  const minimumGroupSize = 2; // groups of 2 should be handled prior

  // find the largest possible chunks the number can be broken into evenly
  for (
    let chunkSize = currentIdLength;
    chunkSize >= minimumGroupSize;
    chunkSize--
  ) {
    if (currentIdLength % chunkSize === 0) {
      // the number can be chunked evenly

      const chunks = [];
      let matchingChunks = 1;
      let chunkItr = 0;

      // for the amount of chunks we need (incrementing in position chunks)
      for (
        let chunkPos = 0;
        chunkPos < currentIdLength;
        chunkPos += currentIdLength / chunkSize
      ) {
        const currentChunk = currentIdString.slice(
          chunkPos,
          chunkPos + currentIdLength / chunkSize
        );
        chunks.push(currentChunk);
        const previousChunkIndex = chunkItr - 1;

        chunkItr++;

        if (previousChunkIndex >= 0) {
          const previousChunk = chunks[previousChunkIndex];
          if (previousChunk === currentChunk) {
            matchingChunks++;
          } else {
            break;
          }
        } // else no chunks to compare to yet
      }

      // we've filled all chunks (because all matched)
      if (matchingChunks === chunkSize) {
        return true;
      }
    }
  }

  return false;
};

export const sumInvalidRangesDueToSymmetricalAndRepeatingPatterns = (
  range: ProductIdRange
): number => {
  let invalidRangeSum = 0;

  // for each range, fill all the numbers
  for (let currentId = range.startId; currentId <= range.endId; currentId++) {
    const currentIdLength = currentId.toString().length;

    if (currentIdLength % 2 === 0 && isEvenSymmetricalNumber(currentId)) {
      invalidRangeSum += currentId;
    } else if (isOddSymmetricalNumber(currentId)) {
      invalidRangeSum += currentId;
    }
  }
  return invalidRangeSum;
};
