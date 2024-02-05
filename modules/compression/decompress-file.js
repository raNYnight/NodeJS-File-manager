import { createReadStream, createWriteStream } from "fs";
import { promisify } from "util";
import { createBrotliDecompress } from "zlib";
import { pipeline as pipelineCallback } from "stream";
import logger from "../utils/custom-logger.js";

const pipeline = promisify(pipelineCallback);

export async function decompressFile(sourcePath, destinationPath) {
  try {
    const sourceStream = createReadStream(sourcePath);
    const destinationStream = createWriteStream(destinationPath);
    const brotliStream = createBrotliDecompress();

    await pipeline(sourceStream, brotliStream, destinationStream);

    logger.log(`File decompressed successfully: ${sourcePath} -> ${destinationPath}`, "green");
  } catch (error) {
    logger.error("An error occurred during decompression:", "red");
    logger.error(error.message, "red");
  }
}
