const fs = require('fs');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const path = require('path');

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.env = {};
    this.serverless.service.provider.environment = this.serverless.service.provider.environment || {};
    this.loadEnv();
  }

  loadEnv() {
    try {
      this.serverless.cli.log('DOTENV: Loading environment variables:');
      const stage = this.serverless.processedInput.options.stage
      const dotenvPath = stage ? `.env.${stage}` : '.env';
      const envVariables = dotenvExpand(dotenv.config({ path: path.resolve(process.cwd(), dotenvPath) })).parsed;
      if (!envVariables) {
        throw new this.serverless.classes.Error('[serverless-dotenv-plugin] Could not find .env file.');
        return false;
      }

      Object.keys(this.env)
        .forEach((key) => {
          this.serverless.cli.log("\t - " + key);
          this.serverless.service.provider.environment[key] = env[key];
        })
    } catch (e) {
        console.error('\n Serverless Plugin Error --------------------------------------\n')
        console.error(`   ${e.message}`);
    }
  }
}

module.exports = ServerlessPlugin;
