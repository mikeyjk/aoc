import * as fs from "fs";

type Point = {
  x: number;
  y: number;
  markCount: number;
};

type Line = {
  pointOne: Point;
  pointTwo: Point;
};

let gridDepth = 0;
let gridWidth = 0;

// store input to array of lines (pointOne -> pointTwo)
const lines: Line[] = fs
  .readFileSync("../sample-input.txt", "utf8")
  .split("\n")
  .filter(Boolean)
  .map((row) => {
    const rowTokens = row.split(/[,]| -> /);
    const x1 = Number(rowTokens[0]);
    const y1 = Number(rowTokens[1]);
    const x2 = Number(rowTokens[2]);
    const y2 = Number(rowTokens[3]);

    gridWidth = Math.max(gridWidth, x1, x2);
    gridDepth = Math.max(gridDepth, y1, y2);

    const pointOne: Point = { x: x1, y: y1, markCount: 1 };
    const pointTwo: Point = { x: x2, y: y2, markCount: 1 };
    return { pointOne, pointTwo };
  });

// print
console.log({ gridWidth, gridDepth });

lines.forEach((line) => {
  console.log({ pointOne: line.pointOne, pointTwo: line.pointTwo });
});

// helper to find the points between two points (vertical and horizontal only)
const populatePointsBetweenStraightLine = (
  isAxisX: boolean,
  fixedAxis: number,
  start: number,
  end: number
): Point[] => {
  let newPoints: Point[] = [];
  // pretty gnarly for-loop, not really recommended
  for (
    var i = start > end ? start - 1 : start + 1;
    i < end || i > end;
    i = i < end ? i + 1 : i > end ? i - 1 : i
  ) {
    newPoints.push({
      x: isAxisX ? i : fixedAxis,
      y: isAxisX ? fixedAxis : i,
      markCount: 1,
    });
  }
  return newPoints;
};

// store all points that are touched by a line
let markedPoints: Point[] = [];

// create array of points for each beginning and end point
// in total representing the drawn line
lines.map((line) => {
  const pointOne = line.pointOne;
  const pointTwo = line.pointTwo;

  let fixedAxis: number;
  let start: number;
  let end: number;
  let isAxisX: boolean = false;

  if (pointOne.x !== pointTwo.x) {
    fixedAxis = pointOne.y;
    start = pointOne.x;
    end = pointTwo.x;
    isAxisX = true;
  } else {
    fixedAxis = pointOne.x;
    start = pointOne.y;
    end = pointTwo.y;
  }

  markedPoints.push(pointOne);

  const interimPoints = populatePointsBetweenStraightLine(
    isAxisX,
    isAxisX ? pointOne.y : pointOne.x,
    isAxisX ? pointOne.x : pointOne.y,
    isAxisX ? pointTwo.x : pointTwo.y
  );

  console.log({ interimPoints });

  interimPoints.map((point) => {
    const duplicatePoint = markedPoints.find((oldPoint) => {
      return oldPoint.x === point.x && oldPoint.y === point.y;
    });

    if (duplicatePoint) {
      duplicatePoint.markCount++;
      console.log("incrementing existing", { duplicatePoint });
    } else {
      console.log("pushing new", { point });
      markedPoints.push(point);
    }
  });

  markedPoints.push(pointTwo);
});

console.log({ markedPoints });

const overlappingPoints = markedPoints.filter(
  (markedPoint) => markedPoint.markCount > 1
);

console.log({ overlappingPoints: overlappingPoints.length });

for (var y = 0; y < gridWidth; y++) {
  for (var x = 0; x < gridDepth; x++) {
    let hasVal = 0;

    markedPoints.forEach((point) => {
      if (point.x === x && point.y === y) {
        hasVal = point.markCount;
      }
    });

    if (hasVal === 0) {
      process.stdout.write(".");
    } else {
      process.stdout.write(String(hasVal));
    }
  }
  process.stdout.write("\n");
}
