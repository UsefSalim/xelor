#!/usr/bin/env node
const program = require('commander');

// const { option } = require('commander');
const { createServer } = require('./utilities/generator/server/starter');
const {
  configEslintPrettier,
} = require('./utilities/generator/server/eslintPrettier');
const {
  configEslintPrettierClient,
} = require('./utilities/generator/client/eslintPrettierClient');
const { createReactApp } = require('./utilities/generator/client/reactapp');
const {
  createCrud,
  createEmptyCrud,
  createModel,
  createValidation,
} = require('./utilities/generator/server/crud');
const { creatAuth } = require('./utilities/generator/server/auth');
// create starter pack
program.version('1.0.0').description('mern generator');
program
  .command('server')
  .description('create a server side')
  .action(() => {
    createServer();
  });
program
  .command('client')
  .description('create a client side with react')
  .action(() => {
    createReactApp();
  });
/// configurations Prettier and eslint
program
  .command('server:prettier')
  .description('configurations and generate file prettier and eslint ')
  .action(() => {
    configEslintPrettier();
  });
program
  .command('crud <ModelName>')
  .description('create a crud with Joi validations')
  .action((ModelName) => {
    createCrud(ModelName);
  });
program
  .command('empty:crud <ModelName>')
  .description('create an empty crud with Joi validations')
  .action((ModelName) => {
    createEmptyCrud(ModelName);
  });
program
  .command('model <ModelName>')
  .description('create an empty Model')
  .action((ModelName) => {
    createModel(ModelName);
  });
program
  .command('validation <ModelName>')
  .description('create an empty Validation')
  .action((ModelName) => {
    createValidation(ModelName);
  });

program
  .command('auth')
  .description('create authentification')
  .action(() => {
    creatAuth();
  });
program
  .command('client:prettier')
  .description('create Mern Application')
  .action(() => {
    configEslintPrettierClient();
  });

program.parse(process.args);
