#!/usr/bin/env node
const program = require('commander');

const { createServer } = require('./utilities/folders');

// create starter pack
program.version('1.0.0').description('express generator');

program
  .command('make:server')
  .alias('ms')
  .description('starter project created succesfuly')
  .action(() => {
    createServer();
  });

program.parse(process.args);
