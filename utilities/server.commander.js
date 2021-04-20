#!/usr/bin/env node
const program = require('commander');
const { createServer } = require('./generator/server/starter');
const { configEslintPrettier } = require('./generator/server/eslintPrettier');
const {
  createCrud,
  createEmptyCrud,
  createModel,
  createValidation,
} = require('./generator/server/crud');
const { creatAuth } = require('./generator/server/auth');
// create starter pack
program.version('1.0.0').description('Mern generator');
program
  .command('server')
  .description('create a server side')
  .action(() => {
    createServer();
  });
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
  .description('create authentication')
  .action(() => {
    creatAuth();
  });
// program.parse(process.args);

module.exports = program;
