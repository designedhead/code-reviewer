const fs = require("fs");
const chalk = require("chalk");

const configFilePath = "./reviewer_config.json";

const deleteConfigFile = () => {
  // Check if the config file exists
  fs.access(configFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(
        chalk.red("Config file does not exist. Nothing to delete.")
      );
      return;
    }

    // Delete the config file
    fs.unlink(configFilePath, (err) => {
      if (err) {
        console.error(chalk.red("Error deleting the config file.", err));
      } else {
        console.log(chalk.green("Config file deleted successfully 🚮"));
      }
    });
  });
};

module.exports = deleteConfigFile;
