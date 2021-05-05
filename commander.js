#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const { createCrud } = require('./utilities/generator/server/crud');
const { creatAuth } = require('./utilities/generator/server/auth');
const { mern, mernAuth, server } = require('./utilities/generator/config');
const { reduxConfig } = require('./utilities/generator/client/reduxConfig');

const staticFiles = `${__dirname}/utilities/static/server/api/crud`;
const { insertFiles } = require('./utilities/generator/server/crud');

let pathfile;
program.version('1.0.0').description('mern generator');

program.option('-i, --image', 'crud model with image');
program.option('-rx, --redux', 'functions crud redu');
const options = program.opts();
program
  .command('mern <ProjectName>')
  .alias('m')
  .description('create a mern app')
  .action((ProjectName) => {
    mern(ProjectName);
  });
program
  .command('mern:auth <ProjectName>')
  .alias('ma')
  .description('create a mern app with authentication')
  .action((ProjectName) => {
    mernAuth(ProjectName);
  });
program
  .command('server <ProjectName>')
  .alias('s')
  .description('Server ->  create a server side')
  .action((ProjectName) => {
    server(ProjectName);
  });
program
  .command('server:auth')
  .alias('sa')
  .description('Server ->  add authentification to the server app')
  .action(() => {
    creatAuth();
  });
program
  .command('crud <ModelName>')
  .alias('c')
  .description('Server ->  add a crud with Joi validations to the server')
  .action((ModelName) => {
    const Model = ModelName.charAt(0).toUpperCase() + ModelName.slice(1);
    createCrud(Model);
    if (options.image) {
      fs.existsSync('./server')
        ? (pathfile = `./server/${staticFiles}`)
        : staticFiles;
      insertFiles(pathfile, 'Multer', 'middlewares');
    }
    if (options.redux) {
      reduxConfig(Model);
    }
  });

program.parse(process.args);
