#!/usr/bin/env node.

const { exec } = require("child_process");
const fs = require("fs");
const chalk = require("chalk");

// functions
const fetchOpenAi = require("./utils/openai");
const styleDynamicText = require("./utils/styledLogs");

// Function to execute shell commands
const execShellCommand = (command) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line security/detect-child-process
    exec(command, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

// Function to get the staged file paths
const getStagedFiles = async () => {
  try {
    // Get the list of staged files using Git command
    const stagedFiles = await execShellCommand(
      "git diff --name-only HEAD | xargs"
    );
    if (!stagedFiles) {
      console.log(chalk.red.bold("\nNo staged files found 😕\n"));
      return;
    }

    // Split the staged files by space to create an array and filter out non-JS files
    const stagedFilesArray = stagedFiles
      .split(" ")
      .filter(
        (path) =>
          path.endsWith(".js") ||
          path.endsWith(".jsx") ||
          path.endsWith(".ts") ||
          path.endsWith(".tsx")
      );

    // Read the contents of each staged file

    // eslint-disable-next-line no-restricted-syntax
    for (const filePath of stagedFilesArray) {
      const modifiedFilePath = filePath.replace("app/", "");

      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.readFile(modifiedFilePath, "utf8", async (err, content) => {
        if (err) {
          console.error(`Error reading file: ${modifiedFilePath}`, err);
          return;
        }

        const res = await fetchOpenAi(
          `File path is:${modifiedFilePath}, file content is: ${content}`
        );

        console.log(chalk.blue.bgBlack.bold(`File ${modifiedFilePath}:\n`));
        console.log(styleDynamicText(res));
        console.log("\n\n\n");
      });
    }
  } catch (error) {
    console.error("Error retrieving staged files:", error);
  }
};

// getStagedFiles();
module.exports = getStagedFiles;
