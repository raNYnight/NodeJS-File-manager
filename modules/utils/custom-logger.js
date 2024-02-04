class CustomConsole {
  log(text, color) {
    console.log(this.getColorizedText(text, color));
  }

  error(text, color) {
    console.error(this.getColorizedText(text, color));
  }

  getColorizedText(text, color) {
    const colors = {
      black: "\x1b[30m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
      white: "\x1b[37m",
    };

    const resetColor = "\x1b[0m";

    const colorCode = colors[color] || "";
    return `${colorCode}${text}${resetColor}`;
  }
}

export default new CustomConsole();
