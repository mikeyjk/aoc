import * as fs from "fs";

const input: string[] = fs
  .readFileSync("../sample-input.txt", "utf8")
  .split("\n");

const bingoNumbers = input
  .shift()
  .split(",")
  .map((stringNumber) => parseInt(stringNumber));

type BoardCell = {
  value: number;
  isBingo: boolean;
};

type BingoRow = BoardCell[];
type BingoColumn = BoardCell[];

// store each column and row as contigous arrays
type BingoBoard = {
  columns: BingoColumn[];
  rows: BingoRow[];
};

// read board numbers into array without hardcoding 5x5
let boardCount = -1;

const bingoBoards = input
  .map((line) => line.split(" ").filter(Boolean))
  .reduce<BingoBoard[]>((prev, current, index) => {
    if (current.length === 0) {
      boardCount++;
    } else {
      prev = prev || [];
      prev[boardCount] = prev[boardCount] || { columns: [], rows: [] };
      prev[boardCount].rows = prev[boardCount].rows || [];
      prev[boardCount].columns = prev[boardCount].columns || [];

      // seems problematic to calculate isBingo ahead of time
      prev[boardCount].rows.push(
        current.map((cellChar, cellIndex) => {
          const cellDigit = parseInt(cellChar);
          prev[boardCount].columns[cellIndex] =
            prev[boardCount].columns[cellIndex] || [];

          prev[boardCount].columns[cellIndex][index] = prev[boardCount].columns[
            cellIndex
          ][index] || { value: 0, isBingo: false };

          prev[boardCount].columns[cellIndex][index].value = cellDigit;
          return { value: cellDigit, isBingo: false };
        })
      );
    }
    return prev;
  }, []);

const hasNumberTriggeredBingo = (
  bingoNumber: number,
  sequence: BingoRow | BingoColumn
): boolean => {
  const requiredMatches = sequence.length;
  let matches = 0;
  sequence.forEach((boardCell) => {
    if (boardCell.isBingo || bingoNumber === boardCell.value) {
      matches++;
      boardCell.isBingo = true;
    }
  });
  return matches === requiredMatches;
};

let bingo = false;
let winningNumber: number;
let bingoSequence: BingoRow | BingoColumn;
let winningBoard: BingoBoard;

// I can 't think of a clever way of doing this, so just gonna brute force
bingoNumbers.forEach((bingoNumber) => {
  bingoBoards.forEach((bingoBoard) => {
    bingoBoard.columns.forEach((bingoColumn) => {
      if (!bingo && hasNumberTriggeredBingo(bingoNumber, bingoColumn)) {
        bingoSequence = bingoColumn;
        winningNumber = bingoNumber;
        winningBoard = bingoBoard;
        bingo = true;
      }
    });

    bingoBoard.rows.forEach((bingoRow) => {
      if (!bingo && hasNumberTriggeredBingo(bingoNumber, bingoRow)) {
        bingoSequence = bingoRow;
        winningNumber = bingoNumber;
        winningBoard = bingoBoard;
        bingo = true;
      }
    });
  });
});

// I have an empty array in here, why D:
const unmarkedNumbers: number[] = winningBoard.rows.reduce<number[]>(
  (prevRow, currRow) => {
    prevRow.push(
      ...currRow
        .filter((bingoCell) => !bingoCell.isBingo)
        .map((unmarkedCell) => unmarkedCell.value)
    );

    return prevRow;
  },
  []
);

const unmarkedNumberSum = unmarkedNumbers.reduce((prevCell, currCell) => {
  return (prevCell += currCell);
}, 0);

console.log({
  winningNumber,
  bingoSequence: bingoSequence.map((sequence) => sequence.value),
  unmarkedNumbers,
  unmarkedNumberSum,
  score: winningNumber * unmarkedNumberSum,
});
