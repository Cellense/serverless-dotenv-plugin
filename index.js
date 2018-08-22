const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { fatal, star } = require('signale');
const path = require('path');

function loadEnv(stage) {
  star(`Stage: `, stage);
  try {
    const dotenvPath = stage === 'production' || stage === 'staging' ? `.env.${stage}` : '.env.dev';
    const envVariables = dotenvExpand(dotenv.config({ path: path.resolve(process.cwd(), dotenvPath) })).parsed;

    star(`-- Loading ENV variables from ${dotenvPath}: `);
  } catch (e) {
    fatal(`Could not load env variables from ${dotenvPath}`)
    fatal(err)
  }
}

module.exports = class ServerlessPlugin {
  constructor(serverless) {
    loadEnv(serverless.processedInput.options.stage || serverless.service.custom.defaultStage)
  }
}
