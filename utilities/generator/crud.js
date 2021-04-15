const fs = require('fs');
const chalk = require('chalk');

const sucess = chalk.bold.green;
const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();
const staticFiles = `${__dirname}/../static/server/api/crud`;
const staticFilesEmpty = `${__dirname}/../static/server/api/crud/empty-crud`;

const creationFiles = (staticFiles, Model, type) => {
  fs.readFile(`${staticFiles}/crud.${type}.js`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const result = data.replace(/ModelName/g, Model.toLowerCase());
      fs.writeFile(
        `${path}/${type}/${Model}.${type}.js`,
        result,
        'utf8',
        (err) => {
          if (err) throw err;
        }
      );
    }
  });
};

const generateClientCrud = () => {
  fs.readFile(`${staticFiles}/client/App.js`, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    } else {
      fs.writeFile(`${path}/client/src/App.js`, data, 'utf8', (err) => {
        if (err) throw err;
      });
    }
  });
};

const insertFiles = (staticFiles, Name, type) => {
  if (!fs.existsSync(`./${type}`)) {
    fs.mkdir(`${path}/${type}`, (err) => {
      if (err) throw err;
    });
    creationFiles(staticFiles, Name, `${type}`);
  } else {
    creationFiles(staticFiles, Name, `${type}`);
  }
};

exports.prefixClient = () => {
  generateClientCrud();
};

exports.createCrud = (Name) => {
  insertFiles(staticFiles, Name, 'controllers');
  insertFiles(staticFiles, Name, 'models');
  insertFiles(staticFiles, Name, 'routes');
  insertFiles(staticFiles, Name, 'validations');
  terminal(sucess(`crud`), run(Name), sucess(`created succesfuly 👏👏`));
};
exports.createEmtyCrud = (Name) => {
  insertFiles(staticFilesEmpty, Name, 'controllers');
  insertFiles(staticFiles, Name, 'models');
  insertFiles(staticFiles, Name, 'routes');
  insertFiles(staticFiles, Name, 'validations');
  terminal(sucess(`crud`), run(Name), sucess(`created succesfuly 👏👏`));
};
exports.createModel = (Name) => {
  insertFiles(staticFiles, Name, 'models');
  terminal(sucess(`Model`), run(Name), sucess(`created succesfuly 👏👏`));
};
exports.createController = (Name) => {
  insertFiles(staticFilesEmpty, Name, 'controllers');
  terminal(sucess(`Controller`), run(Name), sucess(`created succesfuly 👏👏`));
};
exports.createRoute = (Name) => {
  insertFiles(staticFiles, Name, 'routes');
  terminal(sucess(`Route`), run(Name), sucess(`created succesfuly 👏👏`));
};
exports.createValidation = (Name) => {
  insertFiles(staticFiles, Name, 'validations');
  terminal(sucess(`Validation`), run(Name), sucess(`created succesfuly 👏👏`));
};
