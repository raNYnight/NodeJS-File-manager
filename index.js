import { createInterface } from "readline";
import logger from "./modules/utils/custom-logger.js";
import { printCurrentWorkingDirectory } from "./modules/navigation/current-working-directory.js";
import { navigateUp } from "./modules/navigation/navigate-up.js";
import { navigateToDirectory } from "./modules/navigation/navigate-to-directory.js";
import { listDirectoryContents } from "./modules/navigation/list-directory-contents.js";
import { readFile } from "./modules/basic/read-file.js";
import { createFile } from "./modules/basic/create-file.js";
import { renameFile } from "./modules/basic/rename-file.js";
import { copyFile } from "./modules/basic/copy-file.js";
import { handleArguments } from "./modules/utils/handle-arguments.js";
import { moveFile } from "./modules/basic/move-file.js";
import { deleteFile } from "./modules/basic/delete-file.js";

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "User";

logger.log(`Welcome to the File Manager, ${username}!`, "cyan");

await printCurrentWorkingDirectory();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "FileManager> ",
});

rl.prompt();
rl.on("line", async (line) => {
  const [command, ...args] = line.trim().split(" ");
  const argsLine = line.trim().split(" ").slice(1).join(" ");
  const handledArguments = handleArguments(argsLine);
  logger.log(`Command: ${command}, Arguments: ${handledArguments}`, "yellow");
  switch (command) {
    case "up":
      await navigateUp();
      break;
    case "cd":
      await navigateToDirectory(args.join(" "));
      break;
    case "ls":
      await listDirectoryContents();
      break;
    case "cat":
      await readFile(args.join(" "))
        .then(() => {
          logger.log("File content printed successfully", "green");
        })
        .catch((error) => {
          logger.error(`\x1b[31mAn Error occurred: ${error} \x1b[0m`, "red");
        });
      break;
    case "add":
      await createFile(args.join(" "));
      break;
    case "rn":
      await renameFile(handledArguments[0], handledArguments[1]);
      break;
    case "cp":
      await copyFile(handledArguments[0], handledArguments[1]);
      break;
    case "mv":
      moveFile(args[0], args[1]);
      break;
    case "rm":
      deleteFile(args[0]);
      break;
    case "os":
      handleOSInfo(args);
      break;
    case "hash":
      calculateFileHash(args[0]);
      break;
    case "compress":
      compressFile(args[0], args[1]);
      break;
    case "decompress":
      decompressFile(args[0], args[1]);
      break;
    case ".exit":
      exitProgram();
      break;
    default:
      logger.log("Invalid input", "red");
  }

  rl.prompt();
}).on("close", () => {
  exitProgram();
});

function exitProgram() {
  logger.log(`Thank you for using File Manager, ${username}, goodbye!`, "cyan");
  rl.close();
}
