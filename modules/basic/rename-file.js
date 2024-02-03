import { promises as fsPromises } from "fs";
import { dirname, join } from "path";

export async function renameFile(filePath, newFileName) {
  console.log("file path", filePath, "newFileName", newFileName);
  try {
    const directoryPath = dirname(filePath);
    const newFilePath = join(directoryPath, newFileName);

    await fsPromises.rename(filePath, newFilePath);
    console.log(`File '${filePath}' renamed to '${newFilePath}' successfully.`);
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    console.log(
      "If you are trying to rename a file that have a space in its name or path, please use quotes."
    );
  }
}
