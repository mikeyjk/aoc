import * as fs from "fs";

export enum InputType {
  sample = "sample-input.txt",
  input = "input.txt",
}

export class AOCDay {
  constructor(readonly dayNumber: string, readonly inputType: InputType) {}

  getInputType(): string {
    let inputTypeString: string = "";
    switch (this.inputType) {
      case InputType.sample:
        inputTypeString = InputType.sample.toString();
        break;
      default:
        inputTypeString = InputType.input.toString();
        break;
    }
    return inputTypeString;
  }

  getInput(): any {
    return fs
      .readFileSync(
        `${__dirname}/${this.dayNumber}/${this.getInputType()}`,
        "utf8"
      )
      .split("\n");
  }

  runPart1(): any {}

  runPart2(): any {}

  getPart1(): any {
    return this.runPart1();
  }

  getPart2(): any {
    return this.runPart2();
  }
}
