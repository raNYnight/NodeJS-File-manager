import { EOL, cpus, homedir, userInfo, arch } from "os";
import logger from "../utils/custom-logger.js";
import { getEndOfLine } from "./get-eol.js";

export async function handleOSInfo(args) {
  const osCommand = args[0];

  try {
    switch (osCommand) {
      case "--EOL":
        logger.log(`End of Line character: ${getEndOfLine()}`, "green");
        break;
      case "--cpus":
        console.table(
          cpus().map((cpu) => ({
            Model: cpu.model,
            "Speed (GHz)": cpu.speed / 1000,
          }))
        );
        break;
      case "--homedir":
        logger.log(`Home Directory: ${homedir()}`, "green");
        break;
      case "--username":
        logger.log(`Current System Username: ${userInfo().username}`, "green");
        break;
      case "--architecture":
        logger.log(`CPU Architecture: ${arch()}`, "green");
        break;
      default:
        logger.log("Invalid OS command", "green");
    }
  } catch (error) {
    logger.error("An error occurred:", "red");
    logger.error(error, "red");
  }
}
