const fs = require("fs");

const configFilePath = "./reviewer_config.json";

const loadExistingConfig = () => {
  if (fs.existsSync(configFilePath)) {
    const configData = fs.readFileSync(configFilePath, "utf8");
    return JSON.parse(configData);
  }
  return null;
};

module.exports = loadExistingConfig;
