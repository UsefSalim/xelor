#!/usr/bin/env node
const program = require('commander');

const { createServer } = require('./utilities/generator/starter');
const { updateServerEjs } = require('./utilities/generator/esjconfig');

// create starter pack
program.version('1.0.0').description('express generator');
// program.option('-ejs', '--viewengineejs', 'add validations');

/// starter pack
// const options = program.opts();
program
  .command('make:server')
  .alias('ms')
  .description('create a starter project')
  .action(() => {
    createServer();
  });
program
  .command('use:ejs')
  .alias('ue')
  .description('use ejs template engine')
  .action(() => {
    updateServerEjs();
  });

program.parse(process.args);
