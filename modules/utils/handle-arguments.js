export function handleArguments(line) {
  let args = [];
  let currentArg = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    let char = line.charAt(i);

    if (char === " " && !inQuotes) {
      if (currentArg !== "") {
        args.push(currentArg);
        currentArg = "";
      }
    } else if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
    } else {
      currentArg += char;
    }
  }

  if (currentArg !== "") {
    args.push(currentArg);
  }

  return args;
}
