const fs = require('fs');

const { log: terminal } = console;
const path = process.cwd();

exports.createServer = () => {
  !fs.existsSync('./controllers') &&
    fs.mkdir(`${path}/controllers`, (err) => {
      if (err) throw err;
    });
  !fs.existsSync('./models') &&
    fs.mkdir(`${path}/models`, (err) => {
      if (err) throw err;
    });
  !fs.existsSync('./routes') &&
    fs.mkdir(`${path}/routes`, (err) => {
      if (err) throw err;
    });
  !fs.existsSync('./validations') &&
    fs.mkdir(`${path}/validations`, (err) => {
      if (err) throw err;
    });
  !fs.existsSync('./config') &&
    fs.mkdir(`${path}/config`, () => {
      fs.appendFile(
        `${path}/config/.env`,
        `MONGO_URI = 
       NODE_ENV =`,
        (err) => {
          if (err) throw err;
        }
      );
    });
  fs.readFile(`${__dirname}/../static/server.js`, 'utf-8', (err, data) => {
    if (err) throw err;
    fs.appendFile(`server.js`, data, (err) => {
      if (err) throw err;
    });
  });
  !fs.existsSync('.gitignore') &&
    fs.readFile(`${__dirname}/../../.gitignore`, 'utf-8', (err, data) => {
      fs.appendFile(`${path}/.gitignore`, data, (err) => {
        if (err) throw err;
      });
    });
  // !fs.existsSync('README.md') &&
  fs.readFile(`${__dirname}/../../README.md`, 'utf-8', (err, data) => {
    fs.appendFile(`${path}/go.README.md`, data, (err) => {
      if (err) throw err;
    });
  });
  fs.existsSync('package.json') &&
    fs.readFile(`${path}/package.json`, 'utf-8', (err, data) => {
      const jsonFile = JSON.parse(data);
      if (!err) {
        jsonFile.scripts.serverdep =
          'npm i express dotenv cookie-parser mongoose';
        jsonFile.scripts.serverdevdep = 'npm i nodemon morgan -D';
        jsonFile.scripts.dependencies =
          'concurrently "npm run serverdep" "npm run serverdevdep"';
        jsonFile.scripts.server = 'nodemon server.js';
      }
      fs.writeFile(`${path}/package.json`, JSON.stringify(jsonFile), (err) => {
        err && terminal('err', err);
      });
    });
  !fs.existsSync('package.json') &&
    fs.readFile(`${__dirname}/../static/package.json`, 'utf-8', (err, data) => {
      fs.appendFile(`${path}/package.json`, data, (err) => {
        if (err) throw err;
      });
    });
  terminal('server created succesfuly  ');
  terminal('(install dependencies)> npm run dependencies ');
  terminal('> npm run server');
};
