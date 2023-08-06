#!/usr/bin/env node
const yargs = require('yargs')

const reviewCode = require('./code-review')
const loadExistingConfig = require('./utils/loadConfig')
const checkAndAddToGitignore = require('./utils/gitIgnore')
const promptUserConfig = require('./utils/promptConfig')
const deleteConfigFile = require('./utils/clearConfig')

// Function to prompt the user for input and store the value in a config file
const startConfig = async () => {
  await promptUserConfig()

  await checkAndAddToGitignore()
  await reviewCode()
}

const { argv } = yargs
  .option('edit', {
    describe: 'Edit Config file.',
  })
  .option('clear', {
    describe: 'Clear Config file.',
  })
  .help()
  .alias('help', 'h')

if (argv.edit) {
  promptUserConfig()
} else if (argv.clear) {
  deleteConfigFile()
} else {
  // Check if config exists and load it, or prompt the user for config
  const { api_key, max_tokens, file_types } = loadExistingConfig() || {}

  if (api_key && max_tokens && file_types) {
    console.log('🔑 Using existing configuration from .env.')
    reviewCode()
  } else {
    startConfig()
  }
}
