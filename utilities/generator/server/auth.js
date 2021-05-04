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
        `${path}/src/${type}/${Model}.${type}.js`,
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
  if (!fs.existsSync(`./src/${type}`)) {
    fs.mkdir(`${path}/src/${type}`, (err) => {
      if (err) throw err;
    });
    creationFiles(staticFiles, `${type}`, Model);
  } else {
    creationFiles(staticFiles, `${type}`, Model);
  }
};
exports.creatAuth = () => {
  if (fs.existsSync('./server')) shell.exec('cd server');
  if (fs.existsSync('package.json')) {
    insertFiles(staticFiles, 'controllers');
    insertFiles(staticFiles, 'middlewares');
    insertFiles(staticFiles, 'routes');
    insertFiles(staticFiles, 'validations');
    insertFiles(staticFiles, 'models', 'user');
    terminal(success('Authentication  created successfully 👊🏼👊🏼'));
  } else {
    terminal(
      danger(
        'make sure to configure your server before using authentication ⇛'
      ),
      run('xelor s')
    );
  }
};
