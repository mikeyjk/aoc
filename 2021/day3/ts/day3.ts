import * as fs from "fs";

const transposeArray = (input: number[][]): number[][] => {
  const transposed: number[][] = [];

  input.map((row, rowNum) => {
    row.forEach((digit, colNum) => {
      transposed[colNum] = transposed[colNum] || [];
      transposed[colNum][rowNum] = digit;
    });
  });

  return transposed;
};

// the input contains binary sequences in each column
// i.e. sequence #1 is ([0,0],[1,0],[2,0],...,[n,0])
const binarySequencesByColumn: number[][] = fs
  .readFileSync("../input.txt", "utf8")
  .split("\n")
  .filter(Boolean) // ignore EOF line
  .map((line: string) => line.split(""))
  .map((binaryDigits: any[]) => {
    return binaryDigits.map((d: string) => parseInt(d));
  });

// transpose the sequences to be in each row
// i.e. sequence #1 is ([0,1],[0,2],[0,3],...,[0,n])
const binarySequencesByRow: number[][] = transposeArray(
  binarySequencesByColumn
);

console.log({ binarySequencesByColumn, binarySequencesByRow });

const gammaSquence: number[] = binarySequencesByRow.reduce(
  (prevSequence, currSequence, index) => {
    const sequenceLength = currSequence.length;
    prevSequence[index] =
      currSequence.filter(Boolean).length > sequenceLength / 2 ? 1 : 0;
    return prevSequence;
  },
  []
);

const epsilonSequence: number[] = gammaSquence.map((b) => (b === 1 ? 0 : 1));
const gammaRate: number = parseInt(gammaSquence.join(""), 2);
const epsilonRate: number = parseInt(epsilonSequence.join(""), 2);

/**
 * pt2
 */
type BitFreqCount = {
  oneCount: number;
  total: number;
};

const calculateBitFreq = (binarySequences: number[][]): BitFreqCount[] => {
  let frequencyCount: BitFreqCount[] = [];

  binarySequences.forEach((slicedRow) => {
    slicedRow.forEach((digit, columnNum) => {
      frequencyCount[columnNum] = frequencyCount[columnNum] || {
        oneCount: 0,
        total: 0,
      };
      frequencyCount[columnNum].oneCount += digit === 1 ? 1 : 0;
      frequencyCount[columnNum].total++;
    });
  });

  return frequencyCount;
};

const filterSequenceByBitFrequency = (
  majorSequences: number[][],
  minorSequences: number[][],
  columnNumber: number,
  majorMainlyOnes: boolean,
  minorMainlyOnes: boolean
): { majorSequences: number[][]; minorSequences: number[][] } => {
  if (majorSequences.length > 1) {
    for (let i = majorSequences.length - 1; i >= 0; i--) {
      if (majorSequences[i][columnNumber] !== (majorMainlyOnes ? 1 : 0)) {
        majorSequences.splice(i, 1);
      }
    }
  }

  if (minorSequences.length > 1) {
    for (let i = minorSequences.length - 1; i >= 0; i--) {
      if (minorSequences[i][columnNumber] !== (minorMainlyOnes ? 0 : 1)) {
        minorSequences.splice(i, 1);
      }
    }
  }
  return { majorSequences, minorSequences };
};

let oxygenGeneratorSequence: number[][] = new Array(...binarySequencesByColumn);
let c02ScrubberRating: number[][] = new Array(...binarySequencesByColumn);
let loopLength = oxygenGeneratorSequence[0].length;
// console.log({ loopLength, sequenceFilteredMajority });

for (let i = 0; i < loopLength; i++) {
  let majorityBitFreq: BitFreqCount[] = calculateBitFreq(
    oxygenGeneratorSequence
  );
  let minorityBitFreq: BitFreqCount[] = calculateBitFreq(c02ScrubberRating);
  const majorBitFreq = majorityBitFreq[i];
  const minorBitFreq = minorityBitFreq[i];

  console.log({
    majorBitFreq,
    minorBitFreq,
    i,
    oxygenGeneratorSequence,
  });
  const majorColumnMedian = majorBitFreq.total / 2;
  const majorMainlyOnes = majorBitFreq.oneCount >= majorColumnMedian;

  const minorColumnMedian = minorBitFreq.total / 2;
  const minorMainlyOnes = minorBitFreq.oneCount >= minorColumnMedian;

  filterSequenceByBitFrequency(
    oxygenGeneratorSequence,
    c02ScrubberRating,
    i,
    majorMainlyOnes,
    minorMainlyOnes
  );
}

const oxygenGeneratorRate: number = parseInt(
  oxygenGeneratorSequence[0].join(""),
  2
);
const c02ScrubberRate: number = parseInt(c02ScrubberRating[0].join(""), 2);

console.log({
  gammaSquence,
  epsilonSequence,
  gammaRate,
  epsilonRate,
  powerConsumption: gammaRate * epsilonRate,
  oxygenGeneratorSequence,
  c02ScrubberRating,
  oxygenGeneratorRate,
  c02ScrubberRate,
  lifeSupportRating: oxygenGeneratorRate * c02ScrubberRate,
});
