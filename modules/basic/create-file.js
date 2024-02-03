import { promises as fsPromises } from "fs";

export async function createFile(fileName) {
  try {
    await fsPromises.writeFile(fileName, "");
    console.log(`File '${fileName}' created successfully.`);
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}
