const fs = require('fs');
const chalk = require('chalk');

const sucess = chalk.bold.green;
const danger = chalk.bold.red;
const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();

exports.reduxConfig = () => {
  if (fs.existsSync('./client/src')) {
    fs.mkdir(`${path}/client/src/redux`, (err) => {
      if (err) throw err;
    });
  }
};
