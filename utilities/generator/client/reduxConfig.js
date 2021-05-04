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
  if (fs.existsSync('./server')) {
    shell.exec(`cd server && xelor c ${Name}`);
  } else if (fs.existsSync('package.json')) {
    if (!fs.existsSync(`../client/src/redux`)) {
      fs.mkdir(`${path}/../client/src/redux`, (err) => {
        if (err) throw err;
      });
      shell.exec(
        'cd ../client  && pnpm i @reduxjs/toolkit react-redux axios redux-saga'
      );
    }
    if (!fs.existsSync(`../client/src/redux/slices`)) {
      fs.mkdir(`${path}/../client/src/redux/slices`, (err) => {
        if (err) throw err;
      });
    }
    if (!fs.existsSync(`../client/src/redux/sagas`)) {
      fs.mkdir(`${path}/../client/src/redux/sagas`, (err) => {
        if (err) throw err;
      });
      fs.mkdir(`${path}/../client/src/redux/sagas/handlers`, (err) => {
        if (err) throw err;
      });
      fs.mkdir(`${path}/../client/src/redux/sagas/requests`, (err) => {
        if (err) throw err;
      });
    }
    if (!fs.existsSync(`../client/src/redux/ConfigStore.js`)) {
      fs.readFile(`${staticFiles}/configStore.js`, 'utf8', (err, data) => {
        if (err) throw err;
        const result = data.replace(/ModelName/g, Model);
        fs.writeFile(
          `${path}/../client/src/redux/configStore.js`,
          result,
          'utf8',
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
    if (!fs.existsSync(`../client/src/redux/sagas/rootSaga.js`)) {
      fs.readFile(`${staticFiles}/rootSaga.js`, 'utf8', (err, data) => {
        if (err) throw err;
        const result = data.replace(/ModelName/g, Model);
        fs.writeFile(
          `${path}/../client/src/redux/sagas/rootSaga.js`,
          result,
          'utf8',
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
    if (!fs.existsSync(`../client/src/redux/slices/${Model}.slice.js`)) {
      fs.readFile(`${staticFiles}/slice.js`, 'utf8', (err, data) => {
        if (err) throw err;
        const result = data.replace(/ModelName/g, Model);
        fs.writeFile(
          `${path}/../client/src/redux/slices/${Model}.slice.js`,
          result,
          'utf8',
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
    if (
      !fs.existsSync(`../client/src/redux/sagas/handlers/${Model}.slice.js`)
    ) {
      fs.readFile(`${staticFiles}/handler.js`, 'utf8', (err, data) => {
        if (err) throw err;
        const result = data.replace(/ModelName/g, Model);
        fs.writeFile(
          `${path}/../client/src/redux/sagas/handlers/${Model}.handler.js`,
          result,
          'utf8',
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
    if (
      !fs.existsSync(`../client/src/redux/sagas/requests/${Model}.slice.js`)
    ) {
      fs.readFile(`${staticFiles}/request.js`, 'utf8', (err, data) => {
        if (err) throw err;
        const result = data.replace(/ModelName/g, Model);
        fs.writeFile(
          `${path}/../client/src/redux/sagas/requests/${Model}.request.js`,
          result,
          'utf8',
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
  } else {
    terminal(
      danger('make sure to configure your server before using redux ⇛'),
      run('xelor s')
    );
  }
};
