// read the env file and fill up process.env with all the things in my .env file
require("dotenv").config();

const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  env: {
    MONGODB_URI: process.env.MONGODB_URI // mongodb_uri()
  }
});
