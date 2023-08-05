const chalk = require('chalk');

function styleDynamicText(text) {
  const boldPattern = /\*\*(.*?)\*\*/g; // Matches any text enclosed in double asterisks (e.g., **bold text**)
  const codePattern = /`(.*?)`/g; // Matches any text enclosed in backticks (e.g., `code`)
  const numberedParagraphPattern = /^( *\d+\.) /gm;

  const formattedText = text
    .replace(boldPattern, (match, p1) => chalk.bold(p1)) // Style bold text
    .replace(codePattern, (match, p1) => chalk.yellow(p1)) // Style code text with yellow
    .replace(numberedParagraphPattern, (match, p1) => chalk.green(p1)); // Style numbered paragraphs with green

  return formattedText;
}

module.exports = styleDynamicText;
