import { promises as fs } from "fs";
import { basename, join } from "path";
import logger from "../utils/custom-logger.js";

export async function copyFile(sourcePath, destinationPath) {
  try {
    const sourceFileName = basename(sourcePath);
    const destinationFilePath = join(destinationPath, sourceFileName);

    await fs.copyFile(sourcePath, destinationFilePath);
    logger.log("File copied successfully!", "green");
  } catch (error) {
    logger.error("An Operation failed: ", "red");
    logger.error(error.message, "red");
    logger.log(
      "If you are trying to copy a file that have a spaces in its name or path, please use quotes.",
      "red"
    );
  }
}
