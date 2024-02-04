import { createReadStream } from "fs";
import logger from "../utils/custom-logger.js";

export async function readFile(filePath) {
  const readable = createReadStream(filePath, { encoding: "utf8" });
  readable.on("data", (chunk) => {
    logger.log(chunk, "white");
  });

  return new Promise((resolve, reject) => {
    readable.on("end", () => {
      resolve();
    });

    readable.on("error", (error) => {
      reject(error);
    });
  });
}
