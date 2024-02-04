import fs from "fs";
import logger from "../utils/custom-logger.js";

export async function printCurrentWorkingDirectory() {
  try {
    const cwd = await fs.promises.realpath(".");
    logger.log(`You are currently in ${cwd}`, "yellow");
  } catch (error) {
    logger.error(`Operation failed:  ${error}`, "red");
  }
}
