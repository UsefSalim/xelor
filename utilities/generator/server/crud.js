const fs = require('fs');
const chalk = require('chalk');
const shell = require('shelljs');

const success = chalk.bold.green;
const danger = chalk.bold.red;
const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();
const staticFiles = `${__dirname}/../../static/server/api/crud`;

const creationFiles = (staticFiles, Model, type) => {
  fs.readFile(`${staticFiles}/crud.${type}.js`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const result = data
        .replace(/ModelName/g, Model)
        .replace(/test/g, Model.toLowerCase());
      fs.writeFile(
        `${path}/src/${type}/${Model}.${type}.js`,
        result,
        'utf8',
        (err) => {
          if (err) throw err;
        }
      );
    }
  });
};
exports.insertFiles = (staticFiles, Name, type) => {
  if (!fs.existsSync(`./src/${type}`)) {
    fs.mkdir(`${path}/src/${type}`, (err) => {
      if (err) throw err;
    });
    creationFiles(staticFiles, Name, `${type}`);
  } else {
    creationFiles(staticFiles, Name, `${type}`);
  }
};

// exports.prefixClient = () => {
//   generateClientCrud();
// };

exports.createCrud = (Name) => {
  if (fs.existsSync('./server')) shell.exec('cd server');
  if (fs.existsSync('package.json')) {
    this.insertFiles(staticFiles, Name, 'controllers');
    this.insertFiles(staticFiles, Name, 'models');
    this.insertFiles(staticFiles, Name, 'routes');
    this.insertFiles(staticFiles, Name, 'validations');
    terminal(success(`crud`), run(Name), success(`created successfully 👏👏`));
  } else {
    terminal(
      danger(
        'make sure to configure your server before using authentication ⇛'
      ),
      run('xelor s')
    );
  }
};
