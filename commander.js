#!/usr/bin/env node
const program = require('commander');

// const { option } = require('commander');
const { createServer } = require('./utilities/generator/starter');
const {
  configEslintPrettier,
} = require('./utilities/generator/eslintPrettier');
const {
  configEslintPrettierClient,
} = require('./utilities/generator/client/eslintPrettierClient');
const { createReactApp } = require('./utilities/generator/reactapp');
const {
  createCrud,
  createEmtyCrud,
  createModel,
  createValidation,
  createRoute,
  createController,
} = require('./utilities/generator/crud');
// const { createMern } = require('./utilities/generator/mern');
const { creatAuth } = require('./utilities/generator/auth');
// create starter pack
program.version('1.0.0').description('mern generator');
// program.option('-clt', '--client', 'genarate crud with client');

/// starter pack
// const options = program.opts();
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
    // if (option.client) {
    //   prefixClient();
    // }
  });
program
  .command('empty:crud <ModelName>')
  .description('create aempty crud with Joi validations')
  .action((ModelName) => {
    createEmtyCrud(ModelName);
  });
program
  .command('model <ModelName>')
  .description('create aempty Model')
  .action((ModelName) => {
    createModel(ModelName);
  });
program
  .command('validation <ModelName>')
  .description('create aempty Validation')
  .action((ModelName) => {
    createValidation(ModelName);
  });
program
  .command('route <ModelName>')
  .description('create aempty Route')
  .action((ModelName) => {
    createRoute(ModelName);
  });
program
  .command('controller <ModelName>')
  .description('create aempty Controller')
  .action((ModelName) => {
    createController(ModelName);
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
