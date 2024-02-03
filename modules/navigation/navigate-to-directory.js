import printCurrentWorkingDirectory from "./current-working-directory.js";
import { lstat } from "fs/promises";
import { resolve } from "path";
import fs from "fs";

async function navigateToDirectory(directory) {
  try {
    const currentDirectory = await fs.promises.realpath(".");
    const targetDirectory = resolve(currentDirectory, directory);

    try {
      const targetDirStats = await lstat(targetDirectory);
      if (!targetDirStats.isDirectory()) {
        console.log("Invalid directory");
      } else {
        process.chdir(targetDirectory);
        await printCurrentWorkingDirectory();
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
    }
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}
export default navigateToDirectory;
