const fs = require('fs');
const chalk = require('chalk');

const success = chalk.bold.green;
const danger = chalk.bold.red;
const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();
const staticFiles = `${__dirname}/../../static/server/api/auth`;

const creationFiles = (staticFiles, type, Model = 'auth') => {
  fs.readFile(`${staticFiles}/${Model}.${type}.js`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      fs.writeFile(
        `${path}/${type}/${Model}.${type}.js`,
        data,
        'utf8',
        (err) => {
          if (err) throw err;
        }
      );
    }
  });
};

const insertFiles = (staticFiles, type, Model = 'auth') => {
  if (!fs.existsSync(`./${type}`)) {
    fs.mkdir(`${path}/${type}`, (err) => {
      if (err) throw err;
    });
    creationFiles(staticFiles, `${type}`, Model);
  } else {
    creationFiles(staticFiles, `${type}`, Model);
  }
};
exports.creatAuth = () => {
  if (fs.existsSync('package.json')) {
    fs.readFile(`${path}/package.json`, 'utf-8', (err, data) => {
      const jsonFile = JSON.parse(data);
      if (!err) {
        jsonFile.scripts.dep = 'npm i jsonwebtoken bcrypt';
      }
      fs.writeFile(`${path}/package.json`, JSON.stringify(jsonFile), (err) => {
        err && terminal('err', err);
      });
    });
    insertFiles(staticFiles, 'controllers');
    insertFiles(staticFiles, 'middlewares');
    insertFiles(staticFiles, 'routes');
    insertFiles(staticFiles, 'validations');
    insertFiles(staticFiles, 'models', 'user');
    terminal(success('Authentication  created successfully 👊🏼👊🏼'));
    terminal('install dependencies ⇛ ', run('npm run dep'));
  } else {
    terminal(
      danger(
        'make sure to configure your server before using authentication ⇛'
      ),
      run('xelor server')
    );
  }
};
