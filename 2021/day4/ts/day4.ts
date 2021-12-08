import * as fs from "fs";

const input: string[] = fs.readFileSync("../input.txt", "utf8").split("\n");

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
type BingoSequence = BingoRow | BingoColumn;

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

      prev[boardCount].rows.push(
        current.map((cellChar, cellIndex) => {
          const cellDigit = parseInt(cellChar);

          if (!prev[boardCount].columns[cellIndex]) {
            prev[boardCount].columns[cellIndex] = [];
          }

          prev[boardCount].columns[cellIndex][index] = prev[boardCount].columns[
            cellIndex
          ][index] || { value: cellDigit, isBingo: false };

          return { value: cellDigit, isBingo: false };
        })
      );
    }
    return prev;
  }, []);

const hasNumberTriggeredBingo = (
  bingoNumber: number,
  sequence: BingoSequence
): boolean => {
  return (
    sequence.filter((boardCell) => {
      if (!boardCell.isBingo && bingoNumber !== boardCell.value) {
        return boardCell;
      } else {
        boardCell.isBingo = true;
      }
    }).length === 0
  );
};

type SequenceType = "row" | "column";

type Bingo = {
  winningNumber: number;
  winningSequence: number[];
  boardNumber: number;
  unmarkedNumbers: number[];
  sequenceType: SequenceType;
};

let winningBoards: number[] = [];
let winningBoardData: Bingo[] = [];

const populateBoardData = (
  bingoNumber: number,
  boardNumber: number,
  bingoSequence: BingoSequence,
  sequenceType: SequenceType,
  unmarkedNumbers: number[]
): Bingo => {
  return {
    winningNumber: bingoNumber,
    // winningSequence: [...bingoSequence.map((seq) => seq.value).filter(Boolean)],
    winningSequence: [...bingoSequence.map((seq) => seq.value)], // ?
    sequenceType,
    boardNumber,
    unmarkedNumbers,
  };
};

// I can 't think of a clever way of doing this, so just gonna brute force
bingoNumbers.forEach((bingoNumber) => {
  bingoBoards.forEach((bingoBoard, boardNumber) => {
    bingoBoard.columns.forEach((bingoColumn) => {
      if (!winningBoardData[boardNumber]) {
        if (hasNumberTriggeredBingo(bingoNumber, bingoColumn)) {
          winningBoards.push(boardNumber);
          winningBoardData[boardNumber] = populateBoardData(
            bingoNumber,
            boardNumber,
            bingoColumn,
            "column",
            bingoBoard.columns.reduce<number[]>((prevRow, currRow) => {
              prevRow.push(
                ...currRow
                  .filter((bingoCell) => !bingoCell.isBingo)
                  .map((unmarkedCell) => unmarkedCell.value)
              );
              return prevRow;
            }, [])
          );
        }
      }
    });

    bingoBoard.rows.forEach((bingoRow) => {
      if (!winningBoardData[boardNumber]) {
        if (hasNumberTriggeredBingo(bingoNumber, bingoRow)) {
          winningBoards.push(boardNumber);
          winningBoardData[boardNumber] = populateBoardData(
            bingoNumber,
            boardNumber,
            bingoRow,
            "row",
            bingoBoard.rows.reduce<number[]>((prevRow, currRow) => {
              prevRow.push(
                ...currRow
                  .filter((bingoCell) => !bingoCell.isBingo)
                  .map((unmarkedCell) => unmarkedCell.value)
              );
              return prevRow;
            }, [])
          );
        }
      }
    });
  });
});

const firstWinner = winningBoardData[winningBoards.shift()];
const lastWinner = winningBoardData[winningBoards.pop()];

const firstUnmarkedNumberSum = firstWinner.unmarkedNumbers.reduce(
  (prevCell, currCell) => {
    return (prevCell += currCell);
  },
  0
);

const lastUnmarkedNumberSum = lastWinner.unmarkedNumbers.reduce(
  (prevCell, currCell) => {
    return (prevCell += currCell);
  },
  0
);

console.log({
  bingoNumbers,
  firstWinner,
  lastWinner,
  firstUnmarkedNumberSum,
  lastUnmarkedNumberSum,
  firstScore: firstWinner.winningNumber * firstUnmarkedNumberSum,
  lastScore: lastWinner.winningNumber * lastUnmarkedNumberSum,
});
