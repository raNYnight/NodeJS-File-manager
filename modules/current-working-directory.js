import fs from "fs";

async function printCurrentWorkingDirectory() {
  try {
    const cwd = await fs.promises.realpath(".");
    console.log(`You are currently in ${cwd}`);
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}

export default printCurrentWorkingDirectory;
