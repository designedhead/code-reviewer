#!/usr/bin/env node.

const { exec } = require("child_process");
const fs = require("fs");
const chalk = require("chalk");

// functions
const fetchOpenAi = require("./utils/openai");
const styleDynamicText = require("./utils/styledLogs");
const ora = require("ora");

// Function to execute shell commands
const execShellCommand = (command) => {
  return new Promise((resolve, reject) => {
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
    const spinner = ora("Getting a review...").start();

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

    // Use Promise.all to wait for all the file reading operations to complete
    const readPromises = stagedFilesArray.map((filePath) => {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, content) => {
          if (err) {
            console.error(`Error reading file: ${filePath}`, err);
            reject(err);
          } else {
            resolve({ filePath, content });
          }
        });
      });
    });

    // Wait for all file reading promises to resolve
    const results = await Promise.all(readPromises);

    // Process the contents and display the results
    for (const { filePath, content } of results) {
      const res = await fetchOpenAi(
        `File path is:${filePath}, file content is: ${content}`
      );

      console.log(chalk.blue.bgBlack.bold(`File ${filePath}:\n`));
      console.log(styleDynamicText(res));
      console.log("\n\n\n");
    }

    // Stop showing the loading message
    console.log("finished");
    spinner.succeed("Task completed!");
  } catch (error) {
    console.error("Error retrieving staged files:", error);
  }
};

module.exports = getStagedFiles;
