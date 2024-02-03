import { dirname } from "path";
import { printCurrentWorkingDirectory } from "./current-working-directory.js";
import fs from "fs";

export async function navigateUp() {
  try {
    const currentDirectory = await fs.promises.realpath(".");
    const parentDirectory = dirname(currentDirectory);

    if (currentDirectory === parentDirectory) {
      console.log("Cannot go higher than the root directory");
    } else {
      process.chdir(parentDirectory);
      await printCurrentWorkingDirectory();
    }
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}
