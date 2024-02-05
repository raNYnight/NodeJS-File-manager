import { createReadStream } from "fs";
import { createHash } from "crypto";

export async function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");

    const stream = createReadStream(filePath);
    stream.on("error", reject);

    stream.on("data", (data) => {
      hash.update(data);
    });

    stream.on("end", () => {
      const fileHash = hash.digest("hex");
      resolve(fileHash);
    });
  });
}
