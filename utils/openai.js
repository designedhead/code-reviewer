const { fetch } = require("@whatwg-node/fetch");
const path = require("path");
const fs = require("fs");

const credentialsFile = "../code-review-config.json";

function loadCredentials() {
  try {
    const fullPath = path.join(__dirname, credentialsFile);
    if (fs.existsSync(fullPath)) {
      return require(fullPath);
    } else {
      console.error(`Config file missing, please try again.`);
      return null;
    }
  } catch (error) {
    console.error("Error loading config file.", error);
    return null;
  }
}

async function fetchOpenAi(content) {
  try {
    // Load credentials each time
    const credentials = loadCredentials();

    if (!credentials.api_key) throw new Error("Missing config file");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.api_key}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a senior Software enginner reviewing code and providing feedback on how to improve it and remove code smeels.",
          },
          {
            role: "user",
            content,
          },
        ],
        max_tokens: credentials.max_tokens || 500,
        temperature: 0.5,
      }),
    });

    const data = await response.json();

    return (
      data?.choices[0]?.message?.content ||
      data?.error?.message ||
      "Something went wrong..."
    );
  } catch (error) {
    console.error("Something went wrong...", error?.message);
    return "Something went wrong...";
  }
}

module.exports = fetchOpenAi;
