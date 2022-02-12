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

type BitFreqCount = {
  oneCount: number;
  total: number;
};

const calculateColumnBitFreq = (
  binarySequences: number[][]
): BitFreqCount[] => {
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
  inputSequences: number[][],
  columnNumber: number,
  matchingDigit: number
): number[][] => {
  return inputSequences.reduce<number[][]>((previous, current) => {
    if (current[columnNumber] !== matchingDigit) {
      previous.push(current);
    }
    return previous;
  }, []);
};

const filterLifeSupportSequencePart = (
  lifeSupportSequencePart: number[][],
  prefferedDigit: number,
  alternateDigit: number
) => {
  let columnNum = 0;
  let filteredSequencePart = new Array(...lifeSupportSequencePart);

  while (filteredSequencePart.length > 1) {
    let bitFrequency: BitFreqCount[] =
      calculateColumnBitFreq(filteredSequencePart);

    const filterDigit =
      bitFrequency[columnNum].oneCount >= bitFrequency[columnNum].total / 2
        ? prefferedDigit
        : alternateDigit;

    filteredSequencePart = filterSequenceByBitFrequency(
      filteredSequencePart,
      columnNum,
      filterDigit
    );

    columnNum++;
  }
  return filteredSequencePart;
};

// the input contains binary sequences in each column
// i.e. sequence #1 is ([0,0],[1,0],[2,0],...,[n,0])
const binarySequencesByColumn: number[][] = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .split("\n")
  .filter(Boolean) // ignore EOF line
  .map((line: string) => line.split(""))
  .map((binaryDigits: any[]) => {
    return binaryDigits.map((d: string) => parseInt(d));
  });

export const day3 = () => {
  // transpose the sequences to be in each row
  // i.e. sequence #1 is ([0,1],[0,2],[0,3],...,[0,n])
  const gammaSquence: number[] = transposeArray(binarySequencesByColumn).reduce(
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
  const oxygenGeneratorSequence = filterLifeSupportSequencePart(
    binarySequencesByColumn,
    1,
    0
  );
  const c02ScrubberSequence = filterLifeSupportSequencePart(
    binarySequencesByColumn,
    0,
    1
  );
  const oxygenGeneratorRate: number = parseInt(
    oxygenGeneratorSequence[0].join(""),
    2
  );
  const c02ScrubberRate: number = parseInt(c02ScrubberSequence[0].join(""), 2);

  console.log({
    gammaSquence,
    epsilonSequence,
    gammaRate,
    epsilonRate,
    powerConsumption: gammaRate * epsilonRate,
    oxygenGeneratorSequence,
    c02ScrubberSequence,
    oxygenGeneratorRate,
    c02ScrubberRate,
    lifeSupportRating: oxygenGeneratorRate * c02ScrubberRate,
  });

  return {
    gammaSquence,
    epsilonSequence,
    gammaRate,
    epsilonRate,
    powerConsumption: gammaRate * epsilonRate,
    oxygenGeneratorSequence,
    c02ScrubberSequence,
    oxygenGeneratorRate,
    c02ScrubberRate,
    lifeSupportRating: oxygenGeneratorRate * c02ScrubberRate,
  };
};
