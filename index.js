import { createInterface } from "readline";
import printCurrentWorkingDirectory from "./modules/current-working-directory.js";

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "User";

console.log(`Welcome to the File Manager, ${username}!`);

(async () => {
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
        navigateUp();
        break;
      case "cd":
        await navigateToDirectory(args[0]);
        break;
      case "ls":
        await listDirectoryContents();
        break;
      case "cat":
        await readFile(args[0]);
        break;
      case "add":
        await createFile(args[0]);
        break;
      case "rn":
        await renameFile(args[0], args[1]);
        break;
      case "cp":
        await copyFile(args[0], args[1]);
        break;
      case "mv":
        await moveFile(args[0], args[1]);
        break;
      case "rm":
        await deleteFile(args[0]);
        break;
      case "os":
        await handleOSInfo(args);
        break;
      case "hash":
        await calculateFileHash(args[0]);
        break;
      case "compress":
        await compressFile(args[0], args[1]);
        break;
      case "decompress":
        await decompressFile(args[0], args[1]);
        break;
      case ".exit":
        await exitProgram();
        break;
      default:
        console.log("Invalid input");
    }

    rl.prompt();
  }).on("close", async () => {
    await exitProgram();
  });

  function exitProgram() {
    return new Promise((resolve) => {
      console.log("Exiting File Manager...");
      rl.close();
      resolve();
    });
  }
})();
