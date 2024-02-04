import { promises as fs } from "fs";
import { basename, join } from "path";
import logger from "../utils/custom-logger.js";

export async function moveFile(sourcePath, destinationPath) {
  try {
    const sourceFileName = basename(sourcePath);
    const destinationFilePath = join(destinationPath, sourceFileName);

    await fs.rename(sourcePath, destinationFilePath);
    logger.log("File moved successfully!", "green");
  } catch (error) {
    logger.error("An Operation failed: ", "red");
    logger.error(error.message, "red");
    logger.log(
      "If you are trying to move a file that has spaces in its name or path, please use quotes.",
      "red"
    );
  }
}
