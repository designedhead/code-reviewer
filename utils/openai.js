const { fetch } = require("@whatwg-node/fetch");
const credentials = require("../config.json");

async function fetchOpenAi(content) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credentials.api_key}}`,
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
      max_tokens: 800,
      temperature: 0.5,
    }),
  });

  const data = await response.json();

  return data.choices[0]?.message?.content;
}

module.exports = fetchOpenAi;
