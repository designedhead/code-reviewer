#!/usr/bin/env node

const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const reviewCode = require("./code-review");

const configFilePath = "./config.json";

// Function to prompt the user for input and store the value in a config file
const promptUserAndStoreConfig = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "api_key",
      message: "🤖 Enter your OpenAI api key:",
    },
  ]);

  // Save the answers to the config file
  fs.writeFile(configFilePath, JSON.stringify(answers), (err) => {
    if (err) {
      console.error(
        chalk.red("Something went wrong saving the api key.\n\n", err)
      );
    } else {
      console.log(chalk.green("Key saved sucessfully ✓"));
      reviewCode();
    }
  });
};

// load the existing configuration from the config file
const loadExistingConfig = () => {
  if (fs.existsSync(configFilePath)) {
    const configData = fs.readFileSync(configFilePath, "utf8");
    return JSON.parse(configData);
  }
  return null;
};

// Check if config exists and load it, or prompt the user for config
const existingConfig = loadExistingConfig();
if (existingConfig && existingConfig.api_key) {
  console.log("🔑 Using existing configuration from config.json.");
  reviewCode();
} else {
  promptUserAndStoreConfig();
}
