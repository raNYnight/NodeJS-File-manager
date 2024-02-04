import { calculateFileHash } from "./calculate-file-hash.js";
import logger from "../utils/custom-logger.js";

export async function printFileHash(filePath) {
  try {
    const fileHash = await calculateFileHash(filePath);
    logger.log(`Hash of '${filePath}': ${fileHash}`, "green");
  } catch (error) {
    logger.error("An error occurred:", "red");
    logger.error(error, "red");
    logger.log(
      "If you are trying to calculate the hash of a file that has spaces in its name or path, please use quotes.",
      "red"
    );
  }
}
