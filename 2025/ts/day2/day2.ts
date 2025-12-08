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
