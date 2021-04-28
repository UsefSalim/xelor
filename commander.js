#!/usr/bin/env node
const program = require('commander');
const { createServer } = require('./utilities/generator/server/starter');
const {
  configEslintPrettier,
} = require('./utilities/generator/server/eslintPrettier');
const {
  createCrud,
  createEmptyCrud,
  createModel,
  createValidation,
} = require('./utilities/generator/server/crud');
const { creatAuth } = require('./utilities/generator/server/auth');
const { mern, mernAuth } = require('./utilities/generator/config');
// create starter pack
program.version('1.0.0').description('mern generator');
program
  .command('mern <ProjectName>')
  .description('create a mern app')
  .action((ProjectName) => {
    mern(ProjectName);
  });
program
  .command('mern:auth <ProjectName>')
  .description('create a mern app with authentication')
  .action((ProjectName) => {
    mernAuth(ProjectName);
  });
program
  .command('server')
  .description('Server ->  create a server side')
  .action(() => {
    createServer();
  });
program
  .command('server:auth')
  .description('Server ->  add authentification to the server app')
  .action(() => {
    creatAuth();
  });
program
  .command('server:prettier')
  .description(
    'Server ->  configurations and generate file prettier and eslint '
  )
  .action(() => {
    configEslintPrettier();
  });
program
  .command('crud <ModelName>')
  .description('Server ->  add a crud with Joi validations to the server')
  .action((ModelName) => {
    const Model = ModelName.charAt(0).toUpperCase() + ModelName.slice(1);
    createCrud(Model);
  });
program
  .command('empty:crud <ModelName>')
  .description(
    'Server ->  add an empty crud with Joi validations to the server'
  )
  .action((ModelName) => {
    const Model = ModelName.charAt(0).toUpperCase() + ModelName.slice(1);
    createEmptyCrud(Model);
  });
program
  .command('model <ModelName>')
  .description('Server -> create an empty Model')
  .action((ModelName) => {
    const Model = ModelName.charAt(0).toUpperCase() + ModelName.slice(1);
    createModel(Model);
  });
program
  .command('validation <ModelName>')
  .description('Server ->  create an empty Validation')
  .action((ModelName) => {
    const Model = ModelName.charAt(0).toUpperCase() + ModelName.slice(1);
    createValidation(Model);
  });

program.parse(process.args);
