const validateApiKey = (input) => {
  if (typeof input !== 'string') {
    return 'API key must be a string.'
  }

  if (!input.startsWith('sk-')) {
    return 'API key must start with "sk-".'
  }

  return true // Return true to indicate that the input is valid.
}

module.exports = {
  validateApiKey,
}
