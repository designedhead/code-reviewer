#!/usr/bin/env node

const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const reviewCode = require("./code-review");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env

// Function to prompt the user for input and store the value in a config file
const promptUserAndStoreConfig = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "api_key",
      message: "🤖 Enter your OpenAI api key:",
    },
    {
      type: "number",
      name: "max_tokens",
      message: "🔢 Enter the max number of tokens to generate:",
      default: 500,
    },
  ]);

  // Save the answers to the .env file
  fs.writeFileSync(
    ".env",
    `REVIEWER_API_KEY=${answers.api_key}\nREVIEWER_MAX_TOKENS=${answers.max_tokens}`
  );

  console.log(chalk.green("Key saved successfully 👍"));
  reviewCode();
};

// Check if config exists in .env and load it, or prompt the user for config
const existingConfig = {
  api_key: process.env.REVIEWER_API_KEY,
  max_tokens: process.env.REVIEWER_MAX_TOKENS,
};

if (existingConfig.api_key) {
  console.log("🔑 Using existing configuration from .env.");
  reviewCode();
} else {
  promptUserAndStoreConfig();
}
