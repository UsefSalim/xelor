#!/usr/bin/env node
const program = require('commander');

const { createServer } = require('./utilities/generator/starter');
const { updateServerEjs } = require('./utilities/generator/esjconfig');
const {
  configEslintPrettier,
} = require('./utilities/generator/eslintPrettier');
const { createReactApp } = require('./utilities/generator/reactapp');
const { createCrud } = require('./utilities/generator/crud');
// create starter pack
program.version('1.0.0').description('mern generator');
// program.option('-ejs', '--viewengineejs', 'add validations');

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

program
  .command('ejs')
  .description('use ejs template engine')
  .action(() => {
    updateServerEjs();
  });

/// configurations Prettier and eslint
program
  .command('prettier')
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

program.parse(process.args);
