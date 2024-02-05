import { dirname } from "path";
import { printCurrentWorkingDirectory } from "./current-working-directory.js";
import fs from "fs";
import logger from "../utils/custom-logger.js";

export async function navigateUp() {
  try {
    const currentDirectory = await fs.promises.realpath(".");
    const parentDirectory = dirname(currentDirectory);

    if (currentDirectory === parentDirectory) {
      logger.log("Cannot go higher than the root directory", "red");
    } else {
      process.chdir(parentDirectory);
      await printCurrentWorkingDirectory();
    }
  } catch (error) {
    logger.error(`Operation failed:  ${error}`, "red");
  }
}
