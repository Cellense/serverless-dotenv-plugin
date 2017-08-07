'use strict';

const fs = require('fs');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const chalk = require('chalk');

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
      var envPath = this.serverless.service.custom['dotenv'].path || '.env';
      this.env = dotenvExpand(dotenv.config({path: envPath})).parsed;
      if (!this.env) {
        throw new this.serverless.classes.Error('[serverless-dotenv-plugin] Could not find .env file.');
        return false;
      }

      var include = false;
      if (this.serverless.service.custom['dotenv'] && this.serverless.service.custom['dotenv'].include) {
        include = this.serverless.service.custom['dotenv'].include;
      }
      if (include) {
        Object.keys(this.env)
          .filter((key) => !include.includes(key))
          .forEach((key) => {
            delete this.env[key]
          })
      }
      Object.keys(this.env)
        .forEach((key) => {
          this.serverless.cli.log("\t - " + key);
          this.serverless.service.provider.environment[key] = this.env[key];
        })
    } catch (e) {
        console.error(chalk.red('\n Serverless Plugin Error --------------------------------------\n'))
        console.error(chalk.red('  ' + e.message));
    }
    
  }

}

module.exports = ServerlessPlugin;