import * as fs from "fs";
import { AOCDay } from "../aocDay";

type Point = {
  x: number;
  y: number;
  markCount: number;
};

type Line = {
  pointOne: Point;
  pointTwo: Point;
};

export class Day6 extends AOCDay {
  getInput(): any {
    const rawInput: string[] = super.getInput();
    return rawInput.filter(Boolean).map((row) => {
      const rowTokens = row.split(/[,]| -> /);
      const x1 = Number(rowTokens[0]);
      const y1 = Number(rowTokens[1]);
      const x2 = Number(rowTokens[2]);
      const y2 = Number(rowTokens[3]);

      let gridDepth = 0;
      let gridWidth = 0;
      gridWidth = Math.max(gridWidth, x1, x2);
      gridDepth = Math.max(gridDepth, y1, y2);

      const pointOne: Point = { x: x1, y: y1, markCount: 0 };
      const pointTwo: Point = { x: x2, y: y2, markCount: 0 };
      return { pointOne, pointTwo, gridDepth, gridWidth };
    });
  }

  runPart1() {
    const input: any = this.getInput();

    // store all points that are touched by a line
    let markedPoints: Point[] = [];

    let depth = 0;
    let width = 0;

    // create array of points for each beginning and end point
    // in total representing the drawn line
    input.map(
      (line: {
        pointOne: Point;
        pointTwo: Point;
        gridDepth: number;
        gridWidth: number;
      }) => {
        const pointOne = line.pointOne;
        const pointTwo = line.pointTwo;
        const interimPoints: Point[] = this.findPointsBetweenStraightLine(
          pointOne,
          pointTwo
        );

        depth = line.gridDepth;
        width = line.gridDepth; // <- lame

        if (interimPoints.length) {
          interimPoints.map((point) => {
            this.pushUniqueTallyDupe(point, markedPoints);
          });
        }
      }
    );

    const overlappingPoints = markedPoints.filter(
      (markedPoint) => markedPoint.markCount > 1
    );

    console.log({
      linePoints: markedPoints.length,
      overlappingPoints: overlappingPoints.length,
    });

    // this.printGrid(markedPoints, depth, width);
  }

  printGrid(markedPoints: Point[], gridDepth: number, gridWidth: number) {
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
  }

  // store input to array of lines (pointOne -> pointTwo)
  findPointsBetweenStraightLine = (
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

  pushUniqueTallyDupe = (point: Point, stack: Point[]) => {
    const duplicatePoint = stack.find((oldPoint) => {
      return oldPoint.x === point.x && oldPoint.y === point.y;
    });

    if (duplicatePoint) {
      duplicatePoint.markCount++;
    } else {
      stack.push(point);
    }
  };
}
