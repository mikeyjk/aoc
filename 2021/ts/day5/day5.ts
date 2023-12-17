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

const printGrid = (gridWidth: number, gridDepth: number, points: Point[]) => {
  for (var y = 0; y <= gridDepth; y++) {
    for (var x = 0; x <= gridWidth; x++) {
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
};

export const day5pt1 = () => {
  let gridDepth = 0;
  let gridWidth = 0;

  // store input to array of lines (pointOne -> pointTwo)
  const lines: Line[] = fs
    .readFileSync(__dirname + "/input.txt", "utf8")
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

      const pointOne: Point = { x: x1, y: y1, markCount: 0 };
      const pointTwo: Point = { x: x2, y: y2, markCount: 0 };
      return { pointOne, pointTwo };
    });

  const findPointsBetweenStraightLine = (
    pointOne: Point,
    pointTwo: Point
  ): Point[] => {
    let newPoints: Point[] = [];

    if (pointOne.x !== pointTwo.x && pointOne.y === pointTwo.y) {
      const xDiff = Math.abs(pointOne.x - pointTwo.x) + 1;

      newPoints = Array.from(
        { length: xDiff },
        (_v, i) => Math.min(pointOne.x, pointTwo.x) + i
      ).map((i) => {
        return { x: i, y: pointOne.y, markCount: 1 };
      });
    } else if (pointOne.y !== pointTwo.y && pointOne.x === pointTwo.x) {
      const yDiff = Math.abs(pointOne.y - pointTwo.y) + 1;

      newPoints = Array.from(
        { length: yDiff },
        (_v, i) => Math.min(pointOne.y, pointTwo.y) + i
      ).map((i) => {
        return { x: pointOne.x, y: i, markCount: 1 };
      });
    } // else, non-horizontal/vertical line
    return newPoints;
  };

  const pushUniqueTallyDupe = (lines: Line[], point: Point, stack: Point[]) => {
    const duplicatePoint = stack.find((oldPoint) => {
      return oldPoint.x === point.x && oldPoint.y === point.y;
    });

    if (duplicatePoint) {
      duplicatePoint.markCount++;
    } else {
      stack.push(point);
    }
  };

  // store all points that are touched by a line
  let markedPoints: Point[] = [];

  // create array of points for each beginning and end point
  // in total representing the drawn line
  lines.map((line) => {
    const pointOne = line.pointOne;
    const pointTwo = line.pointTwo;
    const interimPoints: Point[] = findPointsBetweenStraightLine(
      pointOne,
      pointTwo
    );

    if (interimPoints.length) {
      interimPoints.map((point) => {
        pushUniqueTallyDupe(lines, point, markedPoints);
      });
    }
  });

  const overlappingPoints = markedPoints.filter(
    (markedPoint) => markedPoint.markCount > 1
  );

  console.log({
    gridWidth,
    gridDepth,
    linePoints: markedPoints.length,
    overlappingPoints: overlappingPoints.length,
  });

  // printGrid(gridWidth, gridDepth, markedPoints);

  return {
    gridWidth,
    gridDepth,
    linePoints: markedPoints.length,
    overlappingPoints: overlappingPoints.length,
  };
};
