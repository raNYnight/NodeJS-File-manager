import { createReadStream, createWriteStream } from "fs";
import { promisify } from "util";
import { createBrotliCompress } from "zlib";
import { pipeline as pipelineCallback } from "stream";
import logger from "../utils/custom-logger.js";

const pipeline = promisify(pipelineCallback);

export async function compressFile(sourcePath, destinationPath) {
  try {
    const sourceStream = createReadStream(sourcePath);
    const destinationStream = createWriteStream(destinationPath);
    const brotliStream = createBrotliCompress();

    await pipeline(sourceStream, brotliStream, destinationStream);

    logger.log(`File compressed successfully: ${sourcePath} -> ${destinationPath}`, "green");
  } catch (error) {
    logger.error("An error occurred during compression:", "red");
    logger.error(error.message, "red");
  }
}
