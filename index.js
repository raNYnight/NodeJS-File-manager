import { createInterface } from "readline";
import printCurrentWorkingDirectory from "./modules/navigation/current-working-directory.js";
import navigateUp from "./modules/navigation/navigate-up.js";
import navigateToDirectory from "./modules/navigation/navigate-to-directory.js";
import listDirectoryContents from "./modules/navigation/list-directory-contents.js";

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "User";

console.log(`Welcome to the File Manager, ${username}!`);

await printCurrentWorkingDirectory();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "FileManager> ",
});

rl.prompt();
rl.on("line", async (line) => {
  const [command, ...args] = line.trim().split(" ");

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
      readFile(args[0]);
      break;
    case "add":
      createFile(args[0]);
      break;
    case "rn":
      renameFile(args[0], args[1]);
      break;
    case "cp":
      copyFile(args[0], args[1]);
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
      console.log("Invalid input");
  }

  rl.prompt();
}).on("close", () => {
  exitProgram();
});

function exitProgram() {
  console.log("Exiting File Manager...");
  rl.close();
}
