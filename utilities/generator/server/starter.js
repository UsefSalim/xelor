const fs = require('fs');
const chalk = require('chalk');

const success = chalk.bold.green;
const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();
const folderName = path.split('\\');
exports.createServer = () => {
  !fs.existsSync('./server') &&
    fs.mkdir(`${path}/server`, (err) => {
      if (err) throw err;
    });
  !fs.existsSync('./server/src') &&
    fs.mkdir(`${path}/server/src`, (err) => {
      if (err) throw err;
    });
  !fs.existsSync('./server/src/controllers') &&
    fs.mkdir(`${path}/server/src/controllers`, (err) => {
      if (err) throw err;
    });
  !fs.existsSync('./server/src/models') &&
    fs.mkdir(`${path}/server/src/models`, (err) => {
      if (err) throw err;
    });
  !fs.existsSync('./server/src/routes') &&
    fs.mkdir(`${path}/server/src/routes`, (err) => {
      if (err) throw err;
    });
  !fs.existsSync('./server/src/validations') &&
    fs.mkdir(`${path}/server/src/validations`, (err) => {
      if (err) throw err;
    });
  !fs.existsSync('./server/src/middlewares') &&
    fs.mkdir(`${path}/server/src/middlewares`, () => {
      fs.appendFile(
        `${path}/server/src/middlewares/errors.middleware.js`,
        `module.exports = (err, req, res, next) => {
  res.status(500).json({ err, messsage: 'Server Error' });
};
`,
        (err) => {
          if (err) throw err;
        }
      );
    });
  !fs.existsSync('./server/config') &&
    fs.mkdir(`${path}/server/config`, () => {
      fs.appendFile(
        `${path}/server/config/.env`,
        `MONGO_URI = 
SECRET_TOKEN =
JWT_EXPIRATION_TIME = 
NODE_ENV = development`,
        (err) => {
          if (err) throw err;
        }
      );
      fs.appendFile(
        `${path}/server/config/db.js`,
        `const mongoose = require('mongoose')
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongo Db Connected'))
  .catch((err) => console.log("error connection to the DataBase :"  + err));`,
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
      !fs.existsSync('./server/server.js') &&
        fs.appendFile(`./server/server.js`, data, (err) => {
          if (err) throw err;
        });
    }
  );
  fs.readFile(
    `${__dirname}/../../static/server/app.js`,
    'utf-8',
    (err, data) => {
      if (err) throw err;
      !fs.existsSync('./server/app.js') &&
        fs.appendFile(`./server/app.js`, data, (err) => {
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
          fs.appendFile(`${path}/server/.gitignore`, data, (err) => {
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
          fs.appendFile(`${path}/server/README.md`, data, (err) => {
            if (err) throw err;
          });
      }
    );
  fs.existsSync('package.json') &&
    fs.readFile(`${path}/server/package.json`, 'utf-8', (err, data) => {
      const jsonFile = JSON.parse(data);
      if (!err) {
        jsonFile.scripts.dep =
          'npm i express dotenv xelor joi cors cookie-parser express-async-errors jsonwebtoken bcrypt helmet mongoose && npm i -D nodemon morgan ';
        jsonFile.scripts.dev = 'nodemon server.js';
      }
      fs.writeFile(
        `${path}/server/package.json`,
        JSON.stringify(jsonFile),
        (err) => {
          err && terminal('err', err);
        }
      );
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
        fs.appendFile(`${path}/server/package.json`, newData, (err) => {
          if (err) throw err;
        });
      }
    );
  terminal(success('Server created successfully  👍👍'));
  terminal('install dependencies ⇛', success('cd server && npm run dep'));
  terminal(run('npm run dev'));
};
