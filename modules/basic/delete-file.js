import fs from "fs";
import logger from "../utils/custom-logger.js";

export async function deleteFile(filePath) {
  console.log(`Deleting file: ${filePath}`);
  try {
    fs.promises.unlink(filePath);
    logger.log("File deleted successfully!", "green");
  } catch (error) {
    logger.error("An error occurred:", "red");
    logger.error(error, "red");
  }
}
