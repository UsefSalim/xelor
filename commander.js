#!/usr/bin/env node
const program = require('commander');


createApp.ServerCreate("default");   /// verification create defaut au lancement node module 
// create starter pack
program
  .version('1.0.0')
  .description('express generator')

program
  .command('make:server')
  .alias('ms')
  .description('starter project created succesfuly')
  .action((modelName) => {
    createApp.ServerCreate(modelName)
  })





program.parse(process.args)