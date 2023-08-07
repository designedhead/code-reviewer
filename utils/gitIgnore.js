const fs = require('fs').promises
const chalk = require('chalk')

// Adds config file to .gitignore

const gitignoreFilePath = './.gitignore'

const checkAndAddToGitignore = async () => {
  try {
    const data = await fs.readFile(gitignoreFilePath, 'utf8')

    // Check if reviewer_config.json is already present in .gitignore
    if (!data.includes('reviewer_config.json')) {
      // Append reviewer_config.json to the .gitignore file
      await fs.appendFile(gitignoreFilePath, '\nreviewer_config.json\n')
      console.log(chalk.green('Config file added to .gitignore 👍'))
    }
  } catch (err) {
    console.error(chalk.red('Error reading or updating .gitignore file:', err))
  }
}

module.exports = checkAndAddToGitignore
