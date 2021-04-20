#!/usr/bin/env node
const program = require('./server.commander');
const {
  configEslintPrettierClient,
} = require('./generator/client/eslintPrettierClient');
const { createReactApp } = require('./generator/client/reactapp');
// create starter pack
program.version('1.0.0').description('Mern generator');

program
  .command('client')
  .description('create a client side with react')
  .action(() => {
    createReactApp();
  });
program
  .command('client:prettier')
  .description('configurations and generate file prettier and eslint ')
  .action(() => {
    configEslintPrettierClient();
  });

program.parse(process.args);
