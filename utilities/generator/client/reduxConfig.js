const fs = require('fs');
const chalk = require('chalk');

const sucess = chalk.bold.green;
const danger = chalk.bold.red;
const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();
const staticFiles = `${__dirname}/../../static/client/redux`;
exports.reduxConfig = (Model) => {
  if (!fs.existsSync(`../client/src/redux`)) {
    fs.mkdir(`${path}/../client/src/redux`, (err) => {
      if (err) console.log('veiller lancer la commande depuit le server');
    });
  }
  if (!fs.existsSync(`../client/src/redux/slices`)) {
    fs.mkdir(`${path}/../client/src/redux/slices`, (err) => {
      if (err) console.log('veiller lancer la commande depuit le server');
    });
  }
  if (!fs.existsSync(`../client/src/redux/saga`)) {
    fs.mkdir(`${path}/../client/src/redux/saga`, (err) => {
      if (err) console.log('veiller lancer la commande depuit le server');
    });
    fs.mkdir(`${path}/../client/src/redux/saga/handlers`, (err) => {
      if (err) console.log('veiller lancer la commande depuit le server');
    });
    fs.mkdir(`${path}/../client/src/redux/saga/requests`, (err) => {
      if (err) console.log('veiller lancer la commande depuit le server');
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
  if (!fs.existsSync(`../client/src/redux/saga/rootSage.js`)) {
    fs.readFile(`${staticFiles}/rootSaga.js`, 'utf8', (err, data) => {
      if (err) throw err;
      const result = data.replace(/ModelName/g, Model);
      fs.writeFile(
        `${path}/../client/src/redux/saga/rootSaga.js`,
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
  if (!fs.existsSync(`../client/src/redux/saga/handlers/${Model}.slice.js`)) {
    fs.readFile(`${staticFiles}/handler.js`, 'utf8', (err, data) => {
      if (err) throw err;
      const result = data.replace(/ModelName/g, Model);
      fs.writeFile(
        `${path}/../client/src/redux/saga/handlers/${Model}.handler.js`,
        result,
        'utf8',
        (err) => {
          if (err) throw err;
        }
      );
    });
  }
  if (!fs.existsSync(`../client/src/redux/saga/requests/${Model}.slice.js`)) {
    fs.readFile(`${staticFiles}/request.js`, 'utf8', (err, data) => {
      if (err) throw err;
      const result = data.replace(/ModelName/g, Model);
      fs.writeFile(
        `${path}/../client/src/redux/saga/requests/${Model}.request.js`,
        result,
        'utf8',
        (err) => {
          if (err) throw err;
        }
      );
    });
  }
};
