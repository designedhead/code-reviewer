require("dotenv").config(); // Load environment variables from .env

function loadCredentials() {
  try {
    const api_key = process.env.API_KEY;
    const max_tokens = process.env.MAX_TOKENS;

    if (!api_key) throw new Error("Missing API_KEY in .env file");

    return { api_key, max_tokens };
  } catch (error) {
    console.error("Error loading credentials from .env file:", error);
    return null;
  }
}

module.exports = loadCredentials;
