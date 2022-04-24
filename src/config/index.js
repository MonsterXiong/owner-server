const env = process.env.NODE_ENV;

let filename = "dev.js";

if (env === "prd-dev") {
  filename = "prd-dev.js";
}
const conf = require(`./env/${filename}`);

module.exports = conf;
