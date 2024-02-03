import { createReadStream } from "fs";

export async function readFile(filePath) {
  const readable = createReadStream(filePath, { encoding: "utf8" });
  readable.on("data", (chunk) => {
    console.log(chunk);
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
