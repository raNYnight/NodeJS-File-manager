import fs from "fs";
import path from "path";
import { printCurrentWorkingDirectory } from "./current-working-directory.js";
import logger from "../utils/custom-logger.js";

export async function listDirectoryContents() {
  const currentDirectory = await fs.promises.realpath(".");
  await printCurrentWorkingDirectory();
  try {
    const files = await fs.promises.readdir(currentDirectory);

    const stats = await Promise.all(
      files.map((file) => fs.promises.lstat(path.join(currentDirectory, file)))
    );

    const directories = [];
    const sortedFiles = [];

    stats.forEach((stat, index) => {
      const file = files[index];
      if (stat.isDirectory()) {
        directories.push(file);
      } else {
        sortedFiles.push(file);
      }
    });

    directories.sort();
    sortedFiles.sort();

    const table = [];

    directories.forEach((directory) => {
      table.push({ Filename: directory, Type: "Directory" });
    });

    sortedFiles.forEach((file) => {
      table.push({ Filename: file, Type: "File" });
    });

    console.table(table, ["Filename", "Type"]);
  } catch (error) {
    logger.error("Error listing directory contents:", "red");
    logger.error(error, "white");
  }
}
