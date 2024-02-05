import { printCurrentWorkingDirectory } from "./current-working-directory.js";
import { lstat } from "fs/promises";
import { resolve } from "path";
import logger from "../utils/custom-logger.js";
import fs from "fs";

export async function navigateToDirectory(directory) {
  try {
    const currentDirectory = await fs.promises.realpath(".");
    const targetDirectory = resolve(currentDirectory, directory);

    try {
      const targetDirStats = await lstat(targetDirectory);
      if (!targetDirStats.isDirectory()) {
        logger.log("Invalid directory", "red");
      } else {
        process.chdir(targetDirectory);
        await printCurrentWorkingDirectory();
      }
    } catch (error) {
      logger.error(`Operation failed:  ${error}`, "red");
    }
  } catch (error) {
    logger.error(`Operation failed:  ${error}`, "red");
  }
}
