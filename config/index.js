const config = Object.assign({}, require("./config.production"));

if (process.env.NODE_ENV !== "production") {
  const localConfig = require("./config.development");
  for (const [key, value] of Object.entries(localConfig)) {
    config[key] = value;
  }
}

module.exports = config;
