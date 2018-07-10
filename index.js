const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { success, fatal } = require('signale');
const path = require('path');

function loadEnv(stage) {
  try {
    const dotenvPath = (stage === 'production' || stage === 'staging') ? '.env.dev' : `.env.${stage}`;
    const envVariables = dotenvExpand(dotenv.config({ path: path.resolve(process.cwd(), dotenvPath) })).parsed;

    success(`Loading env variables from ${dotenvPath}`);
    Object.entries(envVariables).forEach(([name, value]) => {
      success(`${name}: ${value}`)
    });
  } catch (e) {
    fatal(`Could not load env variables from ${dotenvPath}`)
    fatal(err)
  }
}

class ServerlessPlugin {
  constructor(serverless) {
    loadEnv(serverless.processedInput.options.stage)
  }
}

module.exports = ServerlessPlugin;
