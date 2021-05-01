#!/usr/bin/env node
const program = require('commander');
const { createCrud } = require('./utilities/generator/server/crud');
const { creatAuth } = require('./utilities/generator/server/auth');
const { mern, mernAuth, server } = require('./utilities/generator/config');

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
  .command('server <ProjectName>')
  .description('Server ->  create a server side')
  .action((ProjectName) => {
    server(ProjectName);
  });
program
  .command('server:auth')
  .description('Server ->  add authentification to the server app')
  .action(() => {
    creatAuth();
  });
program
  .command('crud <ModelName>')
  .description('Server ->  add a crud with Joi validations to the server')
  .action((ModelName) => {
    const Model = ModelName.charAt(0).toUpperCase() + ModelName.slice(1);
    createCrud(Model);
  });

program.parse(process.args);
