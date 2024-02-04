import { promises as fsPromises } from "fs";
import { dirname, join } from "path";
import logger from "../utils/custom-logger.js";

export async function renameFile(filePath, newFileName) {
  try {
    const directoryPath = dirname(filePath);
    const newFilePath = join(directoryPath, newFileName);

    await fsPromises.rename(filePath, newFilePath);
    logger.log(`File '${filePath}' renamed to '${newFilePath}' successfully.`, "green");
  } catch (error) {
    logger.error(`Error occurred: ${error}`, "red");
    logger.log(
      "If you are trying to rename a file that have a space in its name or path, please use quotes.",
      "red"
    );
  }
}
