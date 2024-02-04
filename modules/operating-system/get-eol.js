import { platform } from "os";

export function getEndOfLine() {
  const userPlatform = platform();
  let endOfLine;

  if (userPlatform === "win32") {
    endOfLine = "\\r\\n";
  } else {
    endOfLine = "\\n";
  }

  return endOfLine;
}
