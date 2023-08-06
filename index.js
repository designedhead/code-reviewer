#!/usr/bin/env node

const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const reviewCode = require("./code-review");
const loadExistingConfig = require("./utils/loadConfig");
const { validateApiKey } = require("./utils/validation");

const configFilePath = "./reviewer_config.json";

// Function to prompt the user for input and store the value in a config file
const promptUserAndStoreConfig = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "api_key",
      message: "🤖 Enter your OpenAI api key:",
      validate: validateApiKey,
    },
    {
      type: "number",
      name: "max_tokens",
      message: "🔢 Enter the max number of tokens to generate:",
      default: 500,
    },
    {
      type: "checkbox",
      name: "file_types",
      message: "📂 Choose the file types you want to accept:",
      choices: [
        { name: ".js" },
        { name: ".jsx" },
        { name: ".ts" },
        { name: ".tsx" },
        { name: ".json" },
        { name: ".html" },
        { name: ".php" },
        { name: ".sh" },
        { name: ".py" },
        { name: ".sql" },
        { name: ".md" },
      ],
    },
  ]);

  // Save the answers to the config file
  fs.writeFile(configFilePath, JSON.stringify(answers), (err) => {
    if (err) {
      console.error(
        chalk.red("Something went wrong saving the configuration.\n\n", err)
      );
    } else {
      console.log(chalk.green("Key saved successfully 👍"));
    }
  });

  reviewCode();
};

// Check if config exists and load it, or prompt the user for config
const { api_key, max_tokens, file_types } = loadExistingConfig();

if (api_key && max_tokens && file_types) {
  console.log("🔑 Using existing configuration from .env.");
  reviewCode();
} else {
  promptUserAndStoreConfig();
}
