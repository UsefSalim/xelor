const fs = require('fs');
const chalk = require('chalk');
const shell = require('shelljs');

const sucess = chalk.bold.green;
const danger = chalk.bold.red;
const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();
const staticFiles = `${__dirname}/../../static/client/redux`;
exports.reduxConfig = (Model) => {
  let dirrectorie;
  fs.existsSync('./server') ? dirrectorie === '../' : '';
  if (fs.existsSync('package.json')) {
    if (!fs.existsSync(`${dirrectorie}client/src/redux`)) {
      fs.mkdir(`${path}/${dirrectorie}client/src/redux`, (err) => {
        if (err) throw err;
      });
      shell.exec(
        `cd ${dirrectorie}client  && pnpm i @reduxjs/toolkit react-redux axios redux-saga`
      );
    }
    if (!fs.existsSync(`${dirrectorie}client/src/redux/slices`)) {
      fs.mkdir(`${path}/${dirrectorie}client/src/redux/slices`, (err) => {
        if (err) throw err;
      });
    }
    if (!fs.existsSync(`${dirrectorie}client/src/redux/sagas`)) {
      fs.mkdir(`${path}/${dirrectorie}client/src/redux/sagas`, (err) => {
        if (err) throw err;
      });
      fs.mkdir(
        `${path}/${dirrectorie}client/src/redux/sagas/handlers`,
        (err) => {
          if (err) throw err;
        }
      );
      fs.mkdir(
        `${path}/${dirrectorie}client/src/redux/sagas/requests`,
        (err) => {
          if (err) throw err;
        }
      );
    }
    createFiles('configStore.js');
    createFiles('sagas/rootSaga.js', 'rootSaga.js');
    createFiles(`slices/${Model}.slice.js`, 'slice.js');
    createFiles(`sagas/handlers/${Model}.slice.js`, 'handler.js');
    createFiles(`sagas/requests/${Model}.slice.js`, 'request.js');
  }
};
const createFiles = (path, file = 'configStore.js', dirname = '../') => {
  if (!fs.existsSync(`${dirname}client/src/redux/${path}`)) {
    fs.readFile(`${staticFiles}/${file}`, 'utf8', (err, data) => {
      if (err) throw err;
      const result = data.replace(/ModelName/g, Model);
      fs.writeFile(
        `${path}/${dirname}client/src/redux/${path}`,
        result,
        'utf8',
        (err) => {
          if (err) throw err;
        }
      );
    });
  }
};
