const { fetch } = require("@whatwg-node/fetch");
const loadExistingConfig = require("./loadConfig");

async function fetchOpenAi(content) {
  try {
    // Load credentials each time
    const credentials = loadExistingConfig();

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
        max_tokens: parseInt(credentials.max_tokens) || 500,
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
