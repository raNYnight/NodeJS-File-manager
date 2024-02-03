import fs from "fs";

export async function printCurrentWorkingDirectory() {
  try {
    const cwd = await fs.promises.realpath(".");
    console.log(`You are currently in ${cwd}`);
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}
