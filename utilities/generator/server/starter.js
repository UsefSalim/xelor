const fs = require('fs');
const chalk = require('chalk');

const success = chalk.bold.green;
const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();
const folderName = path.split('\\');
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
SECRET_TOKEN =
JWT_EXPIRATION_TIME = 
NODE_ENV = development`,
        (err) => {
          if (err) throw err;
        }
      );
    });
  fs.readFile(
    `${__dirname}/../../static/server/server.js`,
    'utf-8',
    (err, data) => {
      if (err) throw err;
      !fs.existsSync('server.js') &&
        fs.appendFile(`server.js`, data, (err) => {
          if (err) throw err;
        });
    }
  );
  !fs.existsSync('.gitignore') &&
    fs.readFile(
      `${__dirname}/../../static/server/.gitignore`,
      'utf-8',
      (err, data) => {
        !err &&
          fs.appendFile(`${path}/.gitignore`, data, (err) => {
            if (err) throw err;
          });
      }
    );
  !fs.existsSync('README.md') &&
    fs.readFile(
      `${__dirname}/../../static/server/README.md`,
      'utf-8',
      (err, data) => {
        !err &&
          fs.appendFile(`${path}/README.md`, data, (err) => {
            if (err) throw err;
          });
      }
    );
  fs.existsSync('package.json') &&
    fs.readFile(`${path}/package.json`, 'utf-8', (err, data) => {
      const jsonFile = JSON.parse(data);
      if (!err) {
        jsonFile.scripts.dep =
          'npm i express dotenv xelor joi cors cookie-parser mongoose && npm i -D nodemon morgan ';
        jsonFile.scripts.dev = 'nodemon server.js';
      }
      fs.writeFile(`${path}/package.json`, JSON.stringify(jsonFile), (err) => {
        err && terminal('err', err);
      });
    });
  !fs.existsSync('package.json') &&
    fs.readFile(
      `${__dirname}/../../static/server/package.json`,
      'utf-8',
      (_err, data) => {
        const newData = data.replace(
          /foldername/g,
          folderName[folderName.length - 1]
        );
        fs.appendFile(`${path}/package.json`, newData, (err) => {
          if (err) throw err;
        });
      }
    );
  terminal(success('Server created successfully  👍👍'));
  terminal('install dependencies ⇛', success('npm run dep'));
  terminal(run('npm run dev'));
};
