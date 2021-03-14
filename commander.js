#!/usr/bin/env node
const program = require('commander');

const { createServer } = require('./utilities/generator/starter');
const { updateServerEjs } = require('./utilities/generator/esjconfig');
const {
  configEslintPrettier,
} = require('./utilities/generator/eslintPrettier');
const { createReactApp } = require('./utilities/generator/reactapp');
// create starter pack
program.version('1.0.0').description('mern generate');
// program.option('-ejs', '--viewengineejs', 'add validations');

/// starter pack
// const options = program.opts();
program
  .command('server')
  .alias('gos')
  .description('create a server side')
  .action(() => {
    createServer();
  });
program
  .command('client')
  .alias('goc')
  .description('create a client side with react')
  .action(() => {
    createReactApp();
  });

program
  .command('ejs')
  .alias('goe')
  .description('use ejs template engine')
  .action(() => {
    updateServerEjs();
  });

/// configurations Prettier and eslint
program
  .command('prettier')
  .alias('gop')
  .description('configurations and generate file prettier and eslint ')
  .action(() => {
    configEslintPrettier();
  });

program.parse(process.args);
