const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { success, fatal, star } = require('signale');
const path = require('path');

function loadEnv(stage) {
  console.log(stage);
  try {
    const dotenvPath = stage === 'production' || stage === 'staging' ? `.env.${stage}` : '.env.dev';
    const envVariables = dotenvExpand(dotenv.config({ path: path.resolve(process.cwd(), dotenvPath) })).parsed;

    success(`-- Loading ENV variables from ${dotenvPath}: `);
    Object.entries(envVariables).forEach(([name, value]) => {
      star(`${name}: ${value}`)
    });
  } catch (e) {
    fatal(`Could not load env variables from ${dotenvPath}`)
    fatal(err)
  }
}

module.exports = class ServerlessPlugin {
  constructor(serverless) {
    loadEnv(serverless.processedInput.options.stage)
  }
}
