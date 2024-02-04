import { promises as fsPromises } from "fs";
import logger from "../utils/custom-logger.js";

export async function createFile(fileName) {
  try {
    await fsPromises.writeFile(fileName, "");
    logger.log(`File '${fileName}' created successfully.`, "green");
  } catch (error) {
    logger.error(`Error occurred: ${error}`, "red");
  }
}
